require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mods', require('./routes/mods'));
app.use('/api/license', require('./routes/license'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
