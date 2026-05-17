const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin&retryWrites=true&w=majority";

async function main() {
  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected successfully!');

  const LeadSchema = new mongoose.Schema({}, { strict: false, collection: 'leads' });
  const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

  const leads = await Lead.find({}).sort({ createdAt: -1 }).limit(10);
  console.log('--- LATEST 10 LEADS IN DATABASE ---');
  leads.forEach(l => {
    console.log(`ID: ${l._id}`);
    console.log(`Name: ${l.name}`);
    console.log(`Email: ${l.email}`);
    console.log(`Budget: ${l.budget}`);
    console.log(`Status: ${l.status}`);
    console.log(`Created At: ${l.createdAt}`);
    console.log(`Message Snippet: ${l.message ? l.message.substring(0, 150) : 'N/A'}`);
    console.log('------------------------------------');
  });

  await mongoose.disconnect();
  console.log('Disconnected!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
