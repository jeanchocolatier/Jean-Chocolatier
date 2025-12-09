#!/bin/bash

# Script pour démarrer le serveur

echo "🚀 Démarrage du serveur Jean Chocolatier..."

# Vérifier si Python 3 est disponible
if command -v python3 &> /dev/null; then
    python3 server.py
elif command -v python &> /dev/null; then
    python server.py
else
    echo "❌ Python n'est pas installé. Veuillez installer Python 3."
    exit 1
fi

