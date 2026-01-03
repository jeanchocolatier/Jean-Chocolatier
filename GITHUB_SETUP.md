# Instructions pour envoyer sur GitHub

## ✅ Étape 1 : Dépôt Git initialisé

Le dépôt Git local a été créé et tous les fichiers ont été ajoutés.

## 📤 Étape 2 : Créer le dépôt sur GitHub

1. **Allez sur GitHub** : https://github.com
2. **Connectez-vous** à votre compte (ou créez-en un)
3. **Cliquez sur le bouton "+"** en haut à droite
4. **Sélectionnez "New repository"**
5. **Remplissez les informations** :
   - **Repository name** : `jean-chocolatier` (ou le nom de votre choix)
   - **Description** : "Site commercial pour Jean Chocolatier"
   - **Visibilité** : Public ou Private (selon votre préférence)
   - **NE COCHEZ PAS** "Initialize this repository with a README" (on a déjà un README)
6. **Cliquez sur "Create repository"**

## 🚀 Étape 3 : Connecter et pousser le code

Une fois le dépôt créé sur GitHub, GitHub vous donnera des instructions. 
**OU** exécutez ces commandes dans votre terminal :

```bash
cd "/Users/beckerfamily/Documents/FAMILLE/JEAN/Jean Chocolatier/Site Cursor"

# Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE_USERNAME/jean-chocolatier.git

# Pousser le code
git branch -M main
git push -u origin main
```

## 🔐 Si GitHub demande une authentification

Si GitHub vous demande un mot de passe :
- **Utilisez un Personal Access Token** (pas votre mot de passe)
- Pour créer un token : GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
- Donnez-lui les permissions `repo`

## ✅ Vérification

Après le push, votre code sera visible sur :
`https://github.com/VOTRE_USERNAME/jean-chocolatier`

## 📝 Commandes rapides

```bash
# Voir l'état
git status

# Ajouter des modifications
git add .
git commit -m "Description des modifications"
git push

# Voir l'historique
git log
```

