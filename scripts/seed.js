const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://mandalnitesh654_db_user:NUSGh4BHcJpib95E@cluster0.i6ugxay.mongodb.net/webcraft?appName=Cluster0'

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

testConnection()