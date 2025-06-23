const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, sequelize } = require('./models/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, event } = req.body;

    // Basic validation: check all fields exist
    if (!name || !email || !phone || !event) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    await User.create({ name, email, phone, event });
    res.json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error during registration', error: err.message });
  }
});

app.listen(4000, async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected. Server running on http://localhost:4000');
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
