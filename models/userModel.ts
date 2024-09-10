import mongoose, { Model, Schema } from 'mongoose'

import type { User } from '../interfaces/user'

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const userModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema)
