@echo off
title WiFi Portal
cd /d %~dp0
echo Installation des modules...
npm install
echo.
echo Démarrage du serveur...
node server.js
pause
