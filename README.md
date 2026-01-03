# Jean Chocolatier - Site Commercial

Site commercial pour la vente de chocolats artisanaux.

## 🚀 Déploiement sur Render

Ce site est configuré pour être déployé sur Render. Voir [RENDER_SETUP.md](RENDER_SETUP.md) pour les instructions complètes.

### Déploiement rapide sur Render

1. Créez un compte sur https://render.com
2. Connectez votre dépôt Git
3. Créez un nouveau "Web Service"
4. Configurez :
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Ajoutez la variable d'environnement `EMAIL_PASSWORD` avec votre mot de passe d'application Gmail
6. Déployez !

## 💻 Démarrage local

### Option 1 : Serveur Node.js (Recommandé) ⭐

**Prérequis** : Node.js doit être installé (vérifié : ✅ Node.js v24.12.0 installé)

```bash
# Installer les dépendances (première fois seulement)
npm install

# Démarrer le serveur
npm start
```

Ou utilisez le script :
```bash
./start-node.sh
```

Le site sera accessible sur : **http://localhost:3000**

### Option 2 : Serveur Python

```bash
python3 server.py
```

Ou utilisez le script :
```bash
./start.sh
```

## 📧 Configuration de l'envoi d'emails

Pour recevoir les emails de commandes et de contact :

1. Allez dans votre compte Google > Sécurité
2. Activez la validation en 2 étapes
3. Créez un mot de passe d'application
4. Définissez la variable d'environnement :
   - **Localement**: `export EMAIL_PASSWORD=votre_mot_de_passe_application`
   - **Sur Render**: Ajoutez-la dans les variables d'environnement du service

**Note :** Sans cette configuration, les messages s'afficheront dans la console mais ne seront pas envoyés par email.

## Fonctionnalités

- Page d'accueil avec présentation et 6 produits
- Panier avec gestion des quantités
- Formulaire de commande
- Page de contact avec envoi d'email
- Design responsive et atmosphère gourmande

## Note

Si vous n'avez pas configuré l'envoi d'emails, les fonctionnalités de commande et de contact fonctionneront toujours, mais les emails ne seront pas envoyés. Vous pouvez tester le site sans cette configuration.

# JeanChocolatier1
