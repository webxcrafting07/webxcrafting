const mongoose = require('mongoose')
// Connecting specifically to the PRIMARY shard in standalone mode
const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin'

async function debugPrimary() {
  console.log('Attempting to connect to PRIMARY shard in standalone mode...')
  const start = Date.now()
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`SUCCESS: Connected to Primary in ${Date.now() - start}ms`)
    await mongoose.disconnect()
  } catch (error) {
    console.error(`FAILURE after ${Date.now() - start}ms:`, error.message)
  }
}

debugPrimary()
