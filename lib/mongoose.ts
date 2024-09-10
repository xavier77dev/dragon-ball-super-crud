import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URI!)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
