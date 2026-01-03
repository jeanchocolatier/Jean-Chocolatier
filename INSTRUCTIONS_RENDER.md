# 📋 Instructions complètes pour Render

## ⚠️ IMPORTANT : Type de service

Votre projet **DOIT** être un **"Web Service"**, **PAS** un "Static Site".

## 🔧 Étapes de configuration dans Render

### 1. Créer un Web Service (pas Static Site)

1. Allez sur https://render.com
2. Cliquez sur **"+ New"** → **"Web Service"**
3. **NE PAS** choisir "Static Site" !

### 2. Connecter le dépôt Git

1. Connectez votre dépôt GitHub/GitLab/Bitbucket
2. Sélectionnez le dépôt "jean-chocolatier"

### 3. Configuration du service

Remplissez ces champs **exactement** comme indiqué :

- **Name** : `jean-chocolatier`
- **Environment** : `Node`
- **Region** : Choisissez votre région (ex: Frankfurt, Oregon)
- **Branch** : `main` (ou votre branche principale)
- **Root Directory** : `.` (un point)
- **Runtime** : `Node` (devrait être automatique)
- **Build Command** : `npm ci`
- **Start Command** : `npm start`
- **Plan** : `Free` (ou votre choix)

### 4. Variables d'environnement (optionnel)

Dans la section "Environment Variables", ajoutez :

- **Key** : `NODE_ENV` → **Value** : `production`
- **Key** : `EMAIL_PASSWORD` → **Value** : votre mot de passe d'application Gmail

### 5. Health Check (optionnel mais recommandé)

- **Health Check Path** : `/health`

### 6. Créer le service

Cliquez sur **"Create Web Service"**

## ✅ Vérification après déploiement

Dans les logs, vous devriez voir :

```
==> Building...
==> npm ci
==> Starting...
==> npm start
🚀 Serveur démarré sur le port 10000
✅ Serveur prêt à recevoir des requêtes
```

## ❌ Si vous voyez "Static Site"

Si Render a créé un "Static Site" par erreur :

1. **Supprimez-le** (Settings → Delete Service)
2. **Recréez** en choisissant **"Web Service"** cette fois

## 🔍 Comment savoir si c'est le bon type ?

Dans le dashboard Render :
- **Web Service** : Affiche "Web Service" en haut, a des logs de serveur
- **Static Site** : Affiche "Static Site", pas de logs de serveur, juste des fichiers

## 📝 Fichiers importants

- `server.js` : Le serveur Express (nécessite Web Service)
- `package.json` : Dépendances Node.js
- `render.yaml` : Configuration automatique (optionnel)

Votre projet **nécessite un serveur qui tourne**, donc c'est un **Web Service**.

