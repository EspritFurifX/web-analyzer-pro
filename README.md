# 🔍 Analyseur Web Pro - Console Injection

> Un outil puissant d'analyse et d'audit de sites web qui s'injecte directement dans la console du navigateur. Analyse complète de la structure, SEO, sécurité, performances et technologies utilisées.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

---

## 🎯 Fonctionnalités

### 📊 Analyse Complète
- **Structure HTML** : Analyse détaillée des balises, hiérarchie des titres (H1-H6), images, liens, scripts
- **Technologies détectées** : Frameworks (React, Vue, Angular), CMS (WordPress, Joomla), CDN, Analytics
- **SEO avancé** : Score SEO/100, meta tags, Open Graph, Twitter Cards, données structurées
- **Responsive** : Détection viewport, media queries, images responsives
- **Performance** : Temps de chargement, ressources, métriques Web Vitals
- **Sécurité** : Headers HTTP, SSL/TLS, vulnérabilités, fichiers sensibles
- **OSINT** : WHOIS, géolocalisation IP, emails, réseaux sociaux, endpoints API

### 🎨 Interface Utilisateur Premium
- Design moderne avec dégradés et animations fluides
- Interface draggable (déplaçable)
- Menu flottant miniaturisé
- Mode clair / sombre avec toggle
- Loader circulaire animé
- Barre de progression en temps réel
- Onglets multiples pour organiser les données

### 🔐 Sécurité & Pentest
- **Tests XSS/Injection** : Simulation de payloads malveillants
- **Détection CMS vulnérables** : WordPress, PrestaShop, Joomla avec scan CVE
- **Fichiers sensibles exposés** : `.env`, `.git/config`, `config.php`, `package.json`
- **Directory Listing** : Détection de répertoires accessibles (`/uploads/`, `/backup/`)
- **Headers de sécurité** : HSTS, CSP, X-Frame-Options, etc.

### 🧠 Intelligence Artificielle
- **Smart Audit** : Rapport automatique avec scores et priorités
- **Recommandations SEO IA** : Suggestions optimisées pour title, meta, H1/H2
- **Analyse prédictive** : Détection de patterns suspects et anomalies

### 📦 Export & Reporting
- **Export JSON** : Toutes les données brutes exportables
- **Export PDF** : Rapport professionnel au format PDF
- **Copie clipboard** : Résultats copiables en un clic

---

## 🚀 Installation & Utilisation

### Méthode 1 : Injection Console (Recommandée)

1. **Ouvrez la console de votre navigateur** sur n'importe quel site web
   - Chrome/Edge : `F12` ou `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
   - Firefox : `F12` ou `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - Safari : `Cmd+Option+C` (Mac)

2. **Copiez tout le contenu du fichier `main.js`**

3. **Collez dans la console et appuyez sur Entrée**

4. **L'interface apparaît automatiquement** 🎉

5. **Cliquez sur "▶️ Analyser ce site"**

### Méthode 2 : Bookmarklet

1. Créez un nouveau favori/marque-page
2. Nommez-le "Analyseur Web"
3. Dans l'URL, collez :
```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://votre-domaine.com/main.js';document.head.appendChild(s);})();
```

4. Cliquez sur le bookmarklet quand vous êtes sur un site à analyser

### Méthode 3 : Extension de Navigateur (À venir)

Extension Chrome/Firefox en cours de développement.

---

## 📖 Guide d'Utilisation

### Interface Principale

L'interface se compose de **10 onglets** :

#### 🏠 Accueil
- Vue d'ensemble avec scores globaux (SEO, Responsive, Moyenne)
- URL analysée et horodatage
- Bouton d'analyse principal

#### 📊 Structure
- Titre de la page et longueur
- Hiérarchie des titres (H1-H6)
- Statistiques : images, liens, scripts, CSS
- Autres éléments : formulaires, iframes, vidéos

#### 💻 Technologies
- Stack technologique complète
- Serveur web détecté
- Frameworks frontend (React, Vue, Angular)
- CMS (WordPress, Shopify, etc.)
- CDN, Analytics, Fonts

#### 🎯 SEO
- Score SEO sur 100
- Title et Meta Description
- Open Graph et Twitter Cards
- Données structurées (Schema.org)
- Images avec attributs alt
- Balises canoniques et robots

#### 📱 Responsive
- Score Responsive sur 100
- Meta viewport
- Media queries CSS détectées
- Images responsives (srcset/picture)
- Frameworks responsive (Bootstrap, Tailwind)

#### 🔒 Sécurité
- Score Sécurité sur 100
- En-têtes HTTP de sécurité (HSTS, CSP, X-Frame-Options)
- SSL/TLS actif
- DNS et adresses IP

#### ⚡ Performance
- Score Performance sur 100
- Temps de chargement total
- DOM Ready
- Nombre de ressources
- Métriques Web Vitals

#### 🕵️ Intelligence (OSINT)
- WHOIS et géolocalisation
- Score de réputation
- Emails et téléphones extraits
- Liens réseaux sociaux
- Domaines externes
- Endpoints API détectés

#### ⚠️ Vulnérabilités
- Score de vulnérabilité sur 100
- Niveau de risque (Faible/Moyen/Élevé)
- Bibliothèques obsolètes
- Mixed content HTTP/HTTPS
- Fichiers sensibles exposés
- Code de debug en production

#### 💡 Recommandations
- Liste de toutes les améliorations suggérées
- Priorités d'optimisation
- Actions à entreprendre

---

## 🛠️ Commandes Console

Une fois l'analyseur chargé, plusieurs commandes sont disponibles :

```javascript
// Lancer une analyse
startAnalysis()

// Exporter les résultats en JSON
exportAnalysis()

// Accéder aux résultats bruts
lastAnalyzer.results

// Exporter en JSON (format complet)
copy(lastAnalyzer.exportJSON())
```

---

## 🏗️ Architecture Technique

### Structure du Code

```
main.js
├── UI Layer (Interface utilisateur)
│   ├── Styles CSS intégrés
│   ├── Animations et transitions
│   ├── Gestion des onglets
│   └── Système de thèmes (clair/sombre)
│
├── WebsiteAnalyzer Class (Analyseur principal)
│   ├── analyzeStructure()        → Analyse DOM
│   ├── detectFrameworks()        → Détection frameworks
│   ├── detectTechnologies()      → Technologies utilisées
│   ├── analyzeSEO()              → Audit SEO
│   ├── analyzeResponsive()       → Tests responsive
│   ├── analyzePerformance()      → Métriques performance
│   ├── analyzeWithExternalAPIs() → APIs externes
│   │   ├── checkSecurityHeaders()
│   │   ├── checkSSL()
│   │   ├── checkWHOIS()
│   │   ├── checkReputation()
│   │   ├── scanVulnerabilities()
│   │   ├── extractDeepMetadata()
│   │   └── getIPIntelligence()
│   ├── generateReport()          → Rapport console
│   └── exportJSON()              → Export données
│
└── Display Functions
    ├── displayResults()           → Affichage UI
    └── startAnalysis()            → Fonction principale
```

### Technologies & APIs Utilisées

- **DOM API** : Analyse directe du DOM du site
- **Performance API** : Métriques de performance navigateur
- **Fetch API** : Requêtes HTTP pour tests
- **Cloudflare DNS** : Résolution DNS
- **IPAPI.co** : Géolocalisation IP et WHOIS
- **Détection native** : Analyse du code source HTML/JS/CSS

---

## 🎨 Personnalisation

### Changer les Couleurs

Modifiez les gradients dans la section `<style>` :

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
```

### Ajouter des Analyses Personnalisées

Étendez la classe `WebsiteAnalyzer` :

```javascript
class WebsiteAnalyzer {
    // ... code existant
    
    customAnalysis() {
        // Votre analyse personnalisée
        this.results.custom = {
            // vos données
        };
    }
}
```

---

## 📊 Exemples de Résultats

### Score SEO
```json
{
  "score": 85,
  "maxScore": 100,
  "details": {
    "title": {
      "present": true,
      "length": 45,
      "optimal": true,
      "content": "Mon Site Web - Titre Optimisé SEO"
    },
    "metaDescription": {
      "present": true,
      "length": 145,
      "optimal": true
    }
  }
}
```

### Technologies Détectées
```json
{
  "frameworks": [
    { "name": "React", "version": "18.2.0" },
    { "name": "Next.js", "detected": true }
  ],
  "technologies": {
    "server": ["Nginx"],
    "cms": ["WordPress"],
    "cdn": ["Cloudflare"],
    "analytics": ["Google Analytics", "Facebook Pixel"]
  }
}
```

---

## 🔒 Sécurité & Confidentialité

### Que fait cet outil ?
- ✅ Analyse **uniquement** le code source public du site
- ✅ Utilise des APIs publiques (WHOIS, DNS)
- ✅ Aucune donnée n'est envoyée à un serveur externe
- ✅ Tout s'exécute localement dans votre navigateur

### Que ne fait-il PAS ?
- ❌ N'envoie pas de données à des serveurs tiers
- ❌ Ne stocke pas d'informations personnelles
- ❌ Ne modifie pas le site analysé
- ❌ N'effectue pas d'attaques réelles

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 Roadmap

### Version 2.1 (En cours)
- [x] Mode clair/sombre
- [x] Menu flottant miniaturisé
- [x] UI draggable
- [x] Loader animé avancé
- [x] Progression en temps réel
- [ ] Onglet "Ressources lourdes"
- [ ] Module XSS/Injection test
- [ ] Détection CMS vulnérables avec CVE
- [ ] Scan fichiers sensibles
- [ ] Directory listing detection

### Version 3.0 (Futur)
- [ ] Smart Audit IA complet
- [ ] Recommandations SEO IA
- [ ] Export PDF professionnel
- [ ] Extension Chrome/Firefox
- [ ] Architecture modulaire OOP
- [ ] Support multilingue
- [ ] API REST pour intégration

---

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**EspritFurtifX**

- GitHub: [@espritfurtifx](https://github.com/espritfurtifx)

---

## 🙏 Remerciements

- Merci à la communauté open source
- Inspiré par des outils comme Wappalyzer, BuiltWith, Lighthouse
- APIs utilisées : Cloudflare DNS, IPAPI.co

---

## ⚠️ Avertissement Légal

Cet outil est destiné à des fins **éducatives et d'audit légitime uniquement**.

- ✅ Utilisez-le sur vos propres sites
- ✅ Utilisez-le avec autorisation explicite
- ❌ N'utilisez pas pour des activités malveillantes
- ❌ Respectez les lois locales sur la cybersécurité

L'auteur décline toute responsabilité en cas d'utilisation abusive.

---

## 📞 Support

Besoin d'aide ? Plusieurs options :

- 🐛 **Issues** : [GitHub Issues](https://github.com/espritfurtifx/web-analyzer/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/espritfurtifx/web-analyzer/discussions)
- 📧 **Email** : support@example.com

---

<div align="center">

**⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile ! ⭐**

Made with ❤️ by EspritFurtifX

</div>
