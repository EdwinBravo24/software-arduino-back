// Importaciones necesarias
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Esquema y modelo de MongoDB
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
const ButtonPress = mongoose.model("ButtonPress", buttonPressSchema)

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message)
    process.exit(1)
  })


// Ruta para obtener registros
app.get("/api/button-presses", async (req, res) => {
  try {
    const buttonPresses = await ButtonPress.find().sort({ timestamp: -1 }).limit(50)
    res.json(buttonPresses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Ruta para simular botones
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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
})
