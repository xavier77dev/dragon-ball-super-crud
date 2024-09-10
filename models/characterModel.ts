import mongoose, { Model, Schema } from 'mongoose'

import type { Character } from '../interfaces/character'

const characterSchema = new Schema<Character>(
  {
    ki: { type: String, required: true },
    name: { type: String, required: true },
    race: { type: String, required: true },
    maxKi: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, default: '' },
    affiliation: { type: String, default: '' },
    owner: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const characterModel: Model<Character> =
  mongoose.models.Character ||
  mongoose.model<Character>('Character', characterSchema)
