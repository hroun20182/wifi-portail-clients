@echo off
title Stop WiFi Portal
echo Arrêt du serveur...
taskkill /IM node.exe /F
pause
