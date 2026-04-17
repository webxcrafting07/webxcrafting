const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-00.i6ugxay.mongodb.net:27017,ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017,ac-bkp5zmm-shard-00-02.i6ugxay.mongodb.net:27017/webcraft?ssl=true&replicaSet=atlas-bkp5zmm-shard-0&authSource=admin&retryWrites=true&w=majority'

async function debugConnection() {
  console.log('Attempting to connect with standard string...')
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
    })
    console.log('SUCCESS: Connected to MongoDB')
    await mongoose.disconnect()
  } catch (error) {
    console.error('CONNECTION ERROR TYPE:', error.name)
    console.error('CONNECTION ERROR MESSAGE:', error.message)
    if (error.reason) {
      console.error('ERROR REASON:', JSON.stringify(error.reason, null, 2))
    }
  }
}

debugConnection()
