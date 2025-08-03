
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing connection with TLS bypass...');

mongoose.connect(process.env.MONGO_URI, {
  tlsAllowInvalidCertificates: true,  // Bypass SSL validation (temporary)
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ MongoDB Connected (Insecure Mode)');
  mongoose.connection.close();
})
.catch(err => {
  console.error('❌ Connection Failed:', err.message);
  console.log('\n🔧 Try these steps:');
  console.log('1. Reset Atlas password to remove special chars');
  console.log('2. Use MongoDB Compass to test visually');
  console.log('3. Check Node.js version (v18+ recommended)');
});
