const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const portalRoutes = require('./routes/portal');
const adminRoutes = require('./routes/admin');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(session({ secret: 'wifi_secret', resave: false, saveUninitialized: true }));

app.use('/', portalRoutes);
app.use('/admin', adminRoutes);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    forfait_type TEXT,
    date_activation DATETIME,
    expire_le DATETIME,
    ip TEXT,
    used BOOLEAN DEFAULT 0
  )`);
});

const PORT = 3000;
app.listen(PORT, () => console.log('Serveur captif lancé sur port', PORT));
