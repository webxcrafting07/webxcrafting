const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-00.i6ugxay.mongodb.net:27017,ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017,ac-bkp5zmm-shard-00-02.i6ugxay.mongodb.net:27017/webcraft?ssl=true&replicaSet=atlas-lza1l8-shard-0&authSource=admin&retryWrites=true&w=majority'

async function finalVerify() {
  console.log('Final verification connection test...')
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('SUCCESS: Connection established to Replica Set')
    await mongoose.disconnect()
  } catch (error) {
    console.error('FAILURE:', error.message)
  }
}

finalVerify()
