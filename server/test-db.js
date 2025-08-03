const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Connection Failed:', err.message);
    console.log('\nCritical Checks:');
    console.log('1. Password in .env matches Atlas exactly');
    console.log('2. IP whitelisted in Atlas (try 0.0.0.0/0 temporarily)');
    console.log('3. No firewall blocking port 27017');
    process.exit(1);
  });
