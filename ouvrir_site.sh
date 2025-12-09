#!/bin/bash

# Script pour ouvrir le site Jean Chocolatier

PORT=8080
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Démarrage du serveur sur le port $PORT..."
echo "📁 Dossier: $DIR"
echo ""

# Tuer les processus existants sur le port
lsof -ti:$PORT 2>/dev/null | xargs kill -9 2>/dev/null

# Démarrer le serveur
cd "$DIR"
python3 -m http.server $PORT &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 2

# Vérifier si le serveur fonctionne
if curl -s http://127.0.0.1:$PORT > /dev/null 2>&1; then
    echo "✅ Serveur démarré avec succès!"
    echo "🌐 Ouverture de Google Chrome..."
    open -a "Google Chrome" "http://127.0.0.1:$PORT"
    echo ""
    echo "📍 Site accessible sur: http://127.0.0.1:$PORT"
    echo "⏹️  Pour arrêter le serveur, appuyez sur Ctrl+C"
    echo ""
    wait $SERVER_PID
else
    echo "❌ Erreur: Le serveur n'a pas pu démarrer"
    echo "💡 Essayez d'installer Python 3 ou utilisez un autre port"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

