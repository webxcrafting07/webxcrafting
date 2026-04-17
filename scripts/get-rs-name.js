const { MongoClient } = require('mongodb')
const MONGODB_URI = 'mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-00.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin'

async function getReplicaSetName() {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('admin')
    const hello = await db.command({ hello: 1 })
    console.log('REPLICA SET NAME:', hello.setName)
    await client.close()
  } catch (error) {
    console.error('ERROR:', error)
  }
}

getReplicaSetName()
