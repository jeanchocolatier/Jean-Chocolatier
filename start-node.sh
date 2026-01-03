#!/bin/bash

# Script pour démarrer le site avec Node.js

echo "🚀 Démarrage du site Jean Chocolatier avec Node.js..."
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js d'abord."
    exit 1
fi

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer le serveur
echo "🌐 Démarrage du serveur..."
echo "📍 Le site sera accessible sur: http://localhost:3000"
echo "⏹️  Pour arrêter le serveur, appuyez sur Ctrl+C"
echo ""

npm start


