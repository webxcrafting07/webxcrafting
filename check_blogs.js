const mongoose = require('mongoose');

const uri = "mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin&retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(uri);
  const blogs = await mongoose.connection.db.collection('blogs').find({}).sort({ createdAt: -1 }).limit(5).toArray();
  
  console.log("Recent Blogs:");
  blogs.forEach(b => {
    console.log(`- ${b.title}`);
    console.log(`  Cover Image: ${b.coverImage}`);
    console.log(`  CreatedAt: ${b.createdAt}`);
  });
  process.exit(0);
}

main().catch(console.error);
