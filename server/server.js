import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and verify routes before use
console.log('Importing routes...');
try {
  const { default: auth } = await import('./routes/auth.js');
  const { default: users } = await import('./routes/users.js');
  console.log('Auth route type:', typeof auth);
  console.log('Users route type:', typeof users);

  app.use('/api/auth', auth);
  app.use('/api/users', users);
} catch (err) {
  console.error('Route import failed:', err);
  process.exit(1);
}

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});