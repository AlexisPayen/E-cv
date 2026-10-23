# E-CV d'Alexis Payen

Mini-site personnel hébergé avec GitHub Pages : https://alexispayen.github.io/E-cv/

## Structure

```
E-cv/
├── index.html          Accueil
├── parcours.html       Expériences et formation (frise filtrable)
├── projets.html        Fiches projets, démos en direct, mini-démos
├── competences.html    Explorateur de compétences
├── contact.html        Contact (coordonnées masquées anti-spam)
├── css/style.css       Design
├── js/script.js        Effets, widget horloge, Ctrl+K, coordonnées encodées
├── js/pages.js         Scripts propres à chaque page
├── assets/             photo.jpg, Cv.pdf, og-image.png, qr-site.png
└── README.md
```

## Modifier le site
- Texte : modifier les fichiers `.html`.
- Couleurs : variables en haut de `css/style.css`.
- Adresses : attribut `data-a="..."` des éléments `class="addr"` dans `parcours.html`.
- Aperçu de partage (LinkedIn) : `assets/og-image.png`.