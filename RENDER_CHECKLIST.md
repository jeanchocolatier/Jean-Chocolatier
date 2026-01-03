# ✅ Checklist de déploiement Render

## Vérifications effectuées

### ✅ Configuration serveur
- [x] Port utilise `process.env.PORT` (compatible Render)
- [x] Serveur écoute sur `0.0.0.0` (accepte les connexions externes)
- [x] Health check endpoint `/health` ajouté
- [x] Gestion d'erreurs complète
- [x] Validation des données d'entrée

### ✅ Fichiers de configuration
- [x] `package.json` avec script `start` correct
- [x] `package.json` avec `engines` spécifiés
- [x] `render.yaml` configuré
- [x] `.gitignore` à jour

### ✅ Gestion des emails
- [x] Fonctionne même sans `EMAIL_PASSWORD` configuré
- [x] Logs clairs si email non configuré
- [x] Ne crash pas si l'envoi d'email échoue

### ✅ Routes et fichiers statiques
- [x] Routes API fonctionnelles (`/api/order`, `/api/contact`)
- [x] Fichiers statiques servis correctement
- [x] Route catch-all pour le routing côté client
- [x] Gestion 404 appropriée

### ✅ Code JavaScript
- [x] URLs relatives (pas de localhost hardcodé)
- [x] Pas d'erreurs de syntaxe
- [x] Gestion d'erreurs côté client

## Configuration Render requise

### Variables d'environnement
- `NODE_ENV` = `production` (optionnel, défini automatiquement)
- `EMAIL_PASSWORD` = votre mot de passe d'application Gmail (optionnel)

### Settings Render
- **Root Directory** : `.` (point)
- **Build Command** : `npm install`
- **Start Command** : `npm start`
- **Environment** : Node

## Test de déploiement

1. ✅ Le serveur démarre sans erreur
2. ✅ Le health check répond : `GET /health`
3. ✅ La page d'accueil se charge : `GET /`
4. ✅ Les fichiers statiques se chargent (CSS, JS, images)
5. ✅ Les routes API fonctionnent : `POST /api/order`, `POST /api/contact`

## En cas de problème

Si Render signale une erreur :
1. Vérifiez les logs dans le dashboard Render
2. Vérifiez que `package.json` est présent
3. Vérifiez que `server.js` est présent
4. Vérifiez que le Root Directory est correct (`.`)
5. Vérifiez que le port n'est pas hardcodé (utilise `process.env.PORT`)

