#!/bin/bash

# Script pour pousser le code sur GitHub

echo "🚀 Préparation pour GitHub..."
echo ""

# Vérifier si le remote existe
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote GitHub déjà configuré"
    REMOTE_URL=$(git remote get-url origin)
    echo "📍 URL: $REMOTE_URL"
else
    echo "❌ Aucun remote GitHub configuré"
    echo ""
    echo "📝 Pour configurer GitHub :"
    echo "1. Créez un dépôt sur https://github.com"
    echo "2. Exécutez :"
    echo "   git remote add origin https://github.com/VOTRE_USERNAME/jean-chocolatier.git"
    echo ""
    read -p "Voulez-vous configurer le remote maintenant ? (o/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        read -p "Entrez l'URL de votre dépôt GitHub: " GITHUB_URL
        git remote add origin "$GITHUB_URL"
        echo "✅ Remote configuré : $GITHUB_URL"
    else
        echo "❌ Remote non configuré. Exécutez manuellement :"
        echo "   git remote add origin https://github.com/VOTRE_USERNAME/jean-chocolatier.git"
        exit 1
    fi
fi

echo ""
echo "📤 Poussage vers GitHub..."
echo ""

# Vérifier s'il y a des modifications non commitées
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Des modifications non commitées détectées"
    read -p "Voulez-vous les ajouter et créer un commit ? (o/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        git add .
        read -p "Message du commit: " COMMIT_MSG
        git commit -m "$COMMIT_MSG"
    fi
fi

# Pousser vers GitHub
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code poussé avec succès sur GitHub !"
    REMOTE_URL=$(git remote get-url origin)
    echo "📍 Votre dépôt : $REMOTE_URL"
else
    echo ""
    echo "❌ Erreur lors du push"
    echo "💡 Vérifiez votre connexion et vos identifiants GitHub"
fi


