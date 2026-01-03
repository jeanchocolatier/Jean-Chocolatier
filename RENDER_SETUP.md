# Configuration pour Render

Ce site est maintenant configuré pour être déployé sur Render.

## Étapes de déploiement sur Render

1. **Créer un compte Render** (si vous n'en avez pas)
   - Allez sur https://render.com
   - Créez un compte gratuit

2. **Connecter votre dépôt Git**
   - Créez un dépôt GitHub/GitLab/Bitbucket avec votre code
   - Dans Render, cliquez sur "New" > "Web Service"
   - Connectez votre dépôt

3. **Configuration du service**
   - **Name**: jean-chocolatier (ou le nom de votre choix)
   - **Environment**: Node
   - **Root Directory**: 
     - Si votre dépôt Git est dans le dossier "Site Cursor" → laissez vide ou mettez `.`
     - Si votre dépôt Git est au niveau parent → mettez `Site Cursor`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (ou le plan de votre choix)

4. **Variables d'environnement**
   - Dans la section "Environment Variables", ajoutez :
     - `NODE_ENV` = `production`
     - `EMAIL_PASSWORD` = votre mot de passe d'application Gmail
       (Pour obtenir ce mot de passe :
        - Allez dans votre compte Google > Sécurité
        - Activez la validation en 2 étapes
        - Créez un mot de passe d'application
        - Utilisez ce mot de passe pour EMAIL_PASSWORD)

5. **Déployer**
   - Cliquez sur "Create Web Service"
   - Render va automatiquement installer les dépendances et démarrer le serveur
   - Votre site sera accessible sur une URL du type : `https://jean-chocolatier.onrender.com`

## Fichiers importants

- `server.js` : Serveur Express configuré pour Render
- `package.json` : Dépendances et scripts
- `render.yaml` : Configuration optionnelle pour Render (si vous utilisez l'infrastructure as code)

## Notes

- Le serveur utilise automatiquement le port fourni par Render via `process.env.PORT`
- Les fichiers statiques (HTML, CSS, JS, images) sont servis automatiquement
- Les routes API (`/api/order` et `/api/contact`) sont fonctionnelles
- Si `EMAIL_PASSWORD` n'est pas configuré, les emails ne seront pas envoyés mais les requêtes fonctionneront quand même

