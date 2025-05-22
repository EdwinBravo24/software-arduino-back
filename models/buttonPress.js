import mongoose from "mongoose"

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

export const ButtonPress = mongoose.model("ButtonPress", buttonPressSchema)
  