// Importaciones necesarias
import express from "express"
import { SerialPort } from "serialport"
import { ReadlineParser } from "@serialport/parser-readline"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Configuración de variables de entorno
dotenv.config()

// Inicializar Express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Esquema de MongoDB para los botones presionados
const buttonPressSchema = new mongoose.Schema({
  button: {
    type: String,
    enum: ["UP", "DOWN", "LEFT", "RIGHT"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

// Modelo de MongoDB
const ButtonPress = mongoose.model("ButtonPress", buttonPressSchema)

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message)
    process.exit(1)
  })

// Código del Arduino (guardado como referencia en el backend)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const arduinoCodePath = path.join(__dirname, "arduino_code.ino")

const arduinoCode = `
// Código de Arduino omitido por brevedad (ya lo tienes arriba)
`

// Guardar el código del Arduino en un archivo
fs.writeFileSync(arduinoCodePath, arduinoCode)
console.log(`📄 Código de Arduino guardado en: ${arduinoCodePath}`)

// Diccionario de traducción
const translations = {
  "Arriba": "UP",
  "Abajo": "DOWN",
  "Izquierda": "LEFT",
  "Derecha": "RIGHT",
}

// Configuración del puerto serial para Arduino
let serialPort
try {
  serialPort = new SerialPort({
    path: process.env.ARDUINO_PORT || "COM3", // Ajusta según tu sistema
    baudRate: 9600,
  })

  const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }))

  parser.on("data", async (data) => {
    const buttonData = data.trim()
    console.log("📥 Dato recibido de Arduino:", buttonData)

    const translated = translations[buttonData] || buttonData // Traducir si aplica

    if (["UP", "DOWN", "LEFT", "RIGHT"].includes(translated)) {
      try {
        const buttonPress = new ButtonPress({
          button: translated,
        })

        await buttonPress.save()
        console.log("✅ Botón guardado en MongoDB:", translated)
      } catch (error) {
        console.error("❌ Error guardando en MongoDB:", error)
      }
    } else {
      console.log("⚠️ Dato ignorado (no es un botón válido):", buttonData)
    }
  })

  serialPort.on("error", (err) => {
    console.error("❌ Error en el puerto serial:", err.message)
  })
} catch (err) {
  console.error("❌ No se pudo conectar al Arduino:", err.message)
}

// Rutas API

// Obtener el código del Arduino
app.get("/api/arduino-code", (req, res) => {
  res.send(arduinoCode)
})

// Obtener últimos registros
app.get("/api/button-presses", async (req, res) => {
  try {
    const buttonPresses = await ButtonPress.find().sort({ timestamp: -1 }).limit(50)
    res.json(buttonPresses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Ruta para simular un botón presionado
app.post("/api/simulate-button", async (req, res) => {
  const { button } = req.body

  if (!["UP", "DOWN", "LEFT", "RIGHT"].includes(button)) {
    return res.status(400).json({ message: "Botón inválido" })
  }

  try {
    const buttonPress = new ButtonPress({ button })
    await buttonPress.save()
    res.status(201).json({ message: "Simulación guardada", data: buttonPress })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
