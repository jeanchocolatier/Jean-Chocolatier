# 📧 Configuration EmailJS

## ✅ EmailJS intégré dans le code

EmailJS a été intégré avec votre Public Key : `hNFvt7uNKVH4Rx9mi`

## 🔧 Configuration requise dans EmailJS

Vous devez créer **2 services** et **2 templates** dans votre compte EmailJS :

### 1. Service pour les commandes

1. Allez sur https://dashboard.emailjs.com/admin/integration
2. Créez un nouveau **Email Service**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Notez le **Service ID** (ex: `service_order`)

### 2. Template pour les commandes

1. Allez sur https://dashboard.emailjs.com/admin/template
2. Créez un nouveau **Email Template**
3. **Template ID** : `template_order`
4. **Service** : Sélectionnez le service créé ci-dessus
5. **To Email** : `chezcapucineetjean.2022@gmail.com`
6. **Subject** : `Nouvelle commande de {{customer_name}}`
7. **Content** (corps de l'email) :

```
Nouvelle commande reçue !

Client:
- Nom: {{customer_name}}
- Email: {{customer_email}}
- Adresse: {{customer_address}}

Détails de la commande:
{{order_items}}

Résumé:
{{order_summary}}

Total: {{order_total}}
```

### 3. Service pour les contacts

1. Créez un autre **Email Service** (ou réutilisez le même)
2. Notez le **Service ID** (ex: `service_contact`)

### 4. Template pour les contacts

1. Créez un nouveau **Email Template**
2. **Template ID** : `template_contact`
3. **Service** : Sélectionnez le service contact
4. **To Email** : `chezcapucineetjean.2022@gmail.com`
5. **Subject** : `Message de contact: {{subject}}`
6. **Content** (corps de l'email) :

```
Nouveau message de contact

De: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}
```

## 📝 Variables utilisées

### Pour les commandes (`template_order`) :
- `{{customer_name}}` - Nom complet du client
- `{{customer_email}}` - Email du client
- `{{customer_address}}` - Adresse du client
- `{{order_items}}` - Détails de chaque article avec prix
- `{{order_summary}}` - Résumé de la commande
- `{{order_total}}` - Total de la commande

### Pour les contacts (`template_contact`) :
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message

## ⚠️ Important

Dans le code, les Service ID et Template ID sont :
- **Service commande** : `service_order`
- **Template commande** : `template_order`
- **Service contact** : `service_contact`
- **Template contact** : `template_contact`

**Assurez-vous d'utiliser exactement ces noms** lors de la création dans EmailJS !

## 🔄 Après la configuration

Une fois les services et templates créés dans EmailJS :
1. Les emails seront envoyés automatiquement
2. Vous recevrez les emails sur `chezcapucineetjean.2022@gmail.com`
3. Aucune configuration supplémentaire n'est nécessaire

## 📧 Test

Pour tester :
1. Remplissez le formulaire de contact → Cliquez sur "Envoyer le message"
2. Ajoutez des produits au panier → Cliquez sur "Commander" → Remplissez le formulaire → Cliquez sur "Valider la commande"

Les emails devraient arriver dans votre boîte mail !

