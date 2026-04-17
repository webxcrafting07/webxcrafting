const mongoose = require('mongoose')
// Connecting to JUST ONE shard in standalone mode
const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-00.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin'

async function debugStandalone() {
  console.log('Attempting to connect to one shard in standalone mode...')
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('SUCCESS: Connected to Standalone Shard')
    await mongoose.disconnect()
  } catch (error) {
    console.error('ERROR:', error.name, ':', error.message)
  }
}

debugStandalone()
