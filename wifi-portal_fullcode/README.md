# Portail Captif WiFi - Windows
## Fonctionnalités
- Vente d'accès WiFi via codes prépayés (paiement liquide).
- Forfaits Jour (8h-19h) et Nuit (20h-7h).
- Code valable 24h après activation.
- Admin Panel pour générer et télécharger les codes (PDF).
- Déblocage automatique via firewall Windows.
## Installation
1. Installer Node.js
2. Installer dépendances :
   npm install express sqlite3 body-parser ejs express-session pdfkit
3. Lancer :
   node server.js
4. Accéder :
   - Portail : http://localhost:3000
   - Admin : http://localhost:3000/admin (Mot de passe: admin123)
