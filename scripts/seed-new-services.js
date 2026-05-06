const { MongoClient } = require('mongodb');

const MONGODB_URI = "mongodb://mandalnitesh654_db_user:NUSGh4BHcJpib95E@ac-bkp5zmm-shard-00-01.i6ugxay.mongodb.net:27017/webcraft?ssl=true&authSource=admin&retryWrites=true&w=majority";

const newServices = [
  {
    icon: 'FaLaptopCode',
    title: 'School Management System',
    description: 'Complete digital solution for schools with student, fee, and exam management.',
    price: 35000,
    originalPrice: 50000,
    popular: false,
    features: ['Student & Staff Profiles', 'Attendance Tracking', 'Fee Management', 'Exam Result Portal', 'Parent-Teacher App'],
    paymentTerms: '40% Advance, 30% after Demo, 30% on Final Setup',
    additionalCharges: 'Server hosting & SMS gateway separate',
    requirements: ['School Logo', 'Student Data', 'Fee Structure', 'Staff Details'],
    detailedDescription: 'A comprehensive management system for educational institutions. Automate your school\'s daily operations, from attendance tracking to digital result generation and secure fee processing.',
    order: 5,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    icon: 'FaStore',
    title: 'Inventory & POS System',
    description: 'Advanced stock tracking and point-of-sale system for retail shops and stores.',
    price: 15000,
    originalPrice: 22000,
    popular: false,
    features: ['Stock Tracking', 'Sales Reporting', 'Barcode Integration', 'Supplier Management', 'Low Stock Alerts'],
    paymentTerms: '50% Advance, 50% on Delivery',
    additionalCharges: 'POS Hardware & Hosting separate',
    requirements: ['Product List', 'Category Data', 'Supplier Info', 'Tax Configuration'],
    detailedDescription: 'Take control of your shop\'s inventory with our premium POS solution. Track every sale, monitor stock levels in real-time, and generate daily/monthly sales reports to grow your business efficiently.',
    order: 6,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('services');
    
    for (const service of newServices) {
      const exists = await collection.findOne({ title: service.title });
      if (!exists) {
        await collection.insertOne(service);
        console.log(`Added: ${service.title}`);
      } else {
        console.log(`Already exists: ${service.title}`);
      }
    }
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await client.close();
  }
}

seed();
