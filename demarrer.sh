#!/bin/bash

# Script de démarrage simple pour Jean Chocolatier

PORT=8000

echo "🚀 Démarrage du serveur Jean Chocolatier sur le port $PORT..."
echo ""

# Tuer tout processus existant sur le port 8000
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Démarrer le serveur
cd "$(dirname "$0")"
python3 -m http.server $PORT > /dev/null 2>&1 &

# Attendre que le serveur démarre
sleep 2

# Ouvrir Chrome
echo "🌐 Ouverture de Google Chrome..."
open -a "Google Chrome" "http://127.0.0.1:$PORT"

echo ""
echo "✅ Site accessible sur: http://127.0.0.1:$PORT"
echo "📝 Pour arrêter le serveur, appuyez sur Ctrl+C ou fermez ce terminal"
echo ""

# Garder le script actif
wait

