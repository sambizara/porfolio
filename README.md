# 🎨 Mon Portfolio

Un portfolio personnel moderne et élégant construit avec **React**, **Vite**, et **Tailwind CSS**.

## 📋 Structure du projet

```
my_porfolio/
├── src/
│   ├── components/
│   │   └── Portfolio.jsx       # Composant principal du portfolio
│   ├── App.jsx                 # Application principale
│   ├── main.jsx                # Point d'entrée
│   └── index.css               # Styles globaux
├── index.html                  # Page HTML principale
├── vite.config.js              # Configuration Vite
├── tailwind.config.js          # Configuration Tailwind CSS
├── postcss.config.js           # Configuration PostCSS
├── package.json                # Dépendances du projet
└── .gitignore                  # Fichiers à ignorer par Git
```

## 🚀 Démarrage rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Le portfolio ouvrira automatiquement sur `http://localhost:3000`

### 3. Construire pour la production

```bash
npm run build
```

Le code compilé sera dans le dossier `dist/`

## ✏️ Personnalisation

Tous les contenus sont regroupés au début du fichier [Portfolio.jsx](src/components/Portfolio.jsx) pour faciliter la personnalisation :

### 👤 PROFILE
- **initials**: Vos initiales
- **name**: Votre nom
- **roles**: Vos rôles/titres (affichés avec effet de frappe)
- **bio**: Votre biographie
- **cvUrl**: Lien vers votre CV
- **social**: Vos réseaux sociaux
- **photoUrl**: Lien vers votre photo

### 💻 SKILLS
Modifiez les compétences par catégorie :
- Frontend
- Backend
- Base de données
- Outils

### 🎯 PROJECTS
Ajoutez vos projets avec :
- titre
- description
- tags
- gradient (couleur)

### ⭐ REVIEWS_SEED
Exemple d'avis pour remplir la section

## 📦 Dépendances principales

- **React**: Framework JavaScript
- **Lucide React**: Icônes modernes
- **Tailwind CSS**: Framework CSS utilitaire
- **Vite**: Bundler et serveur de développement

## 🎨 Personnalisation du design

Le design utilise un thème sombre avec des accents rose/magenta. Vous pouvez :

- Modifier les couleurs dans les composants (couleurs hexadécimales utilisées : `#ec4899`, `#7c3aed`, `#a21caf`)
- Ajuster les gradients dans les variables `PROFILE`, `PROJECTS`
- Modifier les animations CSS dans la balise `<style>` du composant

## 📱 Responsive

Le portfolio est entièrement responsive et fonctionne sur :
- 📱 Mobile
- 💻 Tablette
- 🖥️ Desktop

## 🔗 Sections

1. **Accueil** - Hero section avec présentation
2. **À propos** - Votre biographie
3. **Compétences** - Vos compétences techniques par catégorie
4. **Projets** - Vitrine de vos projets
5. **Contact** - Section contact avec formulaire d'avis

## 💡 Conseils

- Remplacez `photoUrl` par le lien vers votre image
- Ajoutez vos vrais liens sur les boutons sociaux
- Personnalisez les rôles et compétences
- Ajoutez vos véritables projets

## 📄 Licence

Libre d'utilisation pour vos projets personnels.

---

**Bon codage! 🎉**
