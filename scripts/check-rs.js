const { MongoClient } = require('mongodb')
const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-00.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin'

async function checkRSConfig() {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('admin')
    const replSetGetStatus = await db.command({ replSetGetStatus: 1 })
    console.log('REPLICA SET NAME:', replSetGetStatus.set)
    console.log('MEMBERS:')
    replSetGetStatus.members.forEach(m => {
      console.log(` - ${m.name} (${m.stateStr})`)
    })
    await client.close()
  } catch (error) {
    console.error('ERROR:', error)
  }
}

checkRSConfig()
