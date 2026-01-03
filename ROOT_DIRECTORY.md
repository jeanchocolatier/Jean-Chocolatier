# Root Directory pour Render

## Qu'est-ce que le Root Directory ?

Le **Root Directory** dans Render est le dossier où se trouve votre `package.json` et tous les fichiers de votre application.

## Comment déterminer le Root Directory ?

### Cas 1 : Dépôt Git dans le dossier "Site Cursor"
Si vous avez créé votre dépôt Git **dans** le dossier "Site Cursor" :
- **Root Directory** : `.` (point) ou laissez **vide**

```
Site Cursor/          ← Votre dépôt Git commence ici
├── package.json
├── server.js
├── index.html
└── ...
```

### Cas 2 : Dépôt Git au niveau parent
Si votre dépôt Git est **au-dessus** du dossier "Site Cursor" :
- **Root Directory** : `Site Cursor`

```
MonDossier/          ← Votre dépôt Git commence ici
└── Site Cursor/
    ├── package.json
    ├── server.js
    ├── index.html
    └── ...
```

## Comment configurer dans Render ?

### Option 1 : Via l'interface web Render
1. Allez dans les paramètres de votre service
2. Trouvez le champ **"Root Directory"**
3. Entrez `.` ou `Site Cursor` selon votre cas

### Option 2 : Via render.yaml
Le fichier `render.yaml` contient déjà la configuration :
```yaml
rootDir: .  # Changez en "Site Cursor" si nécessaire
```

## Comment vérifier ?

Le root directory est correct si Render peut trouver :
- ✅ `package.json`
- ✅ `server.js`
- ✅ `index.html`

Si Render ne trouve pas ces fichiers, ajustez le root directory.

