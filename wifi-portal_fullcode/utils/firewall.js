const { exec } = require('child_process');

function allowAccess(ip) {
  exec(`netsh advfirewall firewall add rule name="Allow-${ip}" dir=out action=allow remoteip=${ip}`, (err) => {
    if (err) console.error('Erreur firewall:', err);
  });
}

module.exports = { allowAccess };
