const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRoutes);

// Connect to DB, then start server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1); // Exit if DB connection fails
  });
