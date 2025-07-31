const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const { allowAccess } = require('../utils/firewall');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { code } = req.body;
  const ip = req.ip;

  db.get('SELECT * FROM codes WHERE code=?', [code], (err, row) => {
    if (!row) return res.send('Code invalide');

    const now = new Date();
    if (row.used === 0) {
      const expire = new Date(now.getTime() + 24*60*60*1000);
      db.run('UPDATE codes SET used=1, date_activation=?, expire_le=?, ip=? WHERE id=?',
        [now.toISOString(), expire.toISOString(), ip, row.id]);
      allowAccess(ip);
      return res.send('Connexion activée pendant 24h');
    } else {
      if (now > new Date(row.expire_le)) return res.send('Code expiré');
      allowAccess(ip);
      return res.send('Reconnexion réussie');
    }
  });
});

module.exports = router;
