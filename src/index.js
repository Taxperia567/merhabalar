require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

// Body parser
app.use(express.json());

// Static uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mods', require('./routes/mods'));
app.use('/api/license', require('./routes/license'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
