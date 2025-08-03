// COMPLETELY REPLACE the contents with this
const express = require('express');
const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
  res.json({ message: 'Users route working' });
});

// Make sure this is the LAST line
module.exports = router;