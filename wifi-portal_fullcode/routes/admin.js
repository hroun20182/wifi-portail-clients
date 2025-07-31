const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const { generatePDF } = require('../utils/pdf');

const ADMIN_PASS = 'admin123';

router.get('/', (req, res) => {
  if (!req.session.admin) return res.render('login_admin');
  db.all('SELECT * FROM codes', [], (err, rows) => {
    res.render('admin', { codes: rows });
  });
});

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASS) {
    req.session.admin = true;
    return res.redirect('/admin');
  }
  res.send('Mot de passe incorrect');
});

router.post('/generate', (req, res) => {
  const { type, count } = req.body;
  for (let i=0; i<count; i++) {
    const code = Math.random().toString(36).substr(2,6).toUpperCase();
    db.run('INSERT INTO codes (code, forfait_type) VALUES (?,?)', [code, type]);
  }
  res.redirect('/admin');
});

router.get('/pdf', (req, res) => {
  generatePDF(res);
});

module.exports = router;
