# Jean Chocolatier - Site Commercial

Site commercial pour la vente de chocolats artisanaux.

## Démarrage rapide

### Option 1 : Serveur Python (Recommandé)

```bash
python3 server.py
```

Ou utilisez le script :
```bash
./start.sh
```

### Option 2 : Serveur Node.js (si Node.js est installé)

```bash
npm install
npm start
```

Le site sera accessible sur : **http://localhost:3000**

## Configuration de l'envoi d'emails (Optionnel)

Pour recevoir les emails de commandes et de contact :

1. Allez dans votre compte Google > Sécurité
2. Activez la validation en 2 étapes
3. Créez un mot de passe d'application
4. Définissez la variable d'environnement :
   ```bash
   export EMAIL_PASSWORD=votre_mot_de_passe_application
   ```

**Note :** Sans cette configuration, les messages s'afficheront dans la console du serveur mais ne seront pas envoyés par email.

## Fonctionnalités

- Page d'accueil avec présentation et 6 produits
- Panier avec gestion des quantités
- Formulaire de commande
- Page de contact avec envoi d'email
- Design responsive et atmosphère gourmande

## Note

Si vous n'avez pas configuré l'envoi d'emails, les fonctionnalités de commande et de contact fonctionneront toujours, mais les emails ne seront pas envoyés. Vous pouvez tester le site sans cette configuration.

