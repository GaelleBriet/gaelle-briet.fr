# Site portfolio gaelle-briet.fr : brief technique

## Contexte
Site vitrine d'une développeuse front-end freelance. Une page d'accueil, une page annexe plus tard (/drapeaux). La maquette est validée (export HTML Claude Design fourni comme référence visuelle, ne pas réutiliser son code). Le site est statique, sans back-end, sans base de données.

Règles de travail :
- Ne jamais commit ni push sans me le demander explicitement.
- Demander confirmation avant toute suppression ou écrasement de fichier.
- Pas de dépendance non justifiée. Si une lib n'apporte rien de mesurable, on ne l'ajoute pas.
- Ne jamais mentionner de nom de client dans le code, les textes, les métadonnées ou les commits. Le secteur se dit "industrie / énergie", rien de plus.

## Stack
- Nuxt 4, TypeScript, génération statique (`nuxt generate`). Pas de SSR à l'exécution, pas de serveur.
- CSS natif avec variables (`app/assets/css/tokens.css`, issu du fichier fourni avec la maquette). Pas de Tailwind, pas de framework CSS.
- Polices auto-hébergées via `@fontsource/fraunces` (500, 600, 700), `@fontsource/karla` (400, 500, 600), `@fontsource/ibm-plex-mono` (500, 600). Aucun appel à Google Fonts (RGPD).
- Images : WebP fournies, chargées en `<img>` avec `width`, `height`, `loading="lazy"` sauf l'affiche du hero. `@nuxt/image` uniquement si ça simplifie réellement.
- Aucun script tiers, aucun analytics au départ. Si un jour : Cloudflare Web Analytics (sans cookie), rien d'autre.

## Structure attendue
```
app/
  assets/css/tokens.css        (fourni)
  assets/css/base.css          (reset léger, typographie, utilitaires)
  components/
    SiteHeader.vue             nav : marque GB + nom, liens, bouton Contact
    SiteFooter.vue             sceau, zone, contact, navigation, copyright
    HeroPoster.vue             affiche encadrée, légende
    ProjectCard.vue            fiche cartonnée : onglet statut, numéro, capture avec coins photo, texte, stack, bouton
    ProjectGallery.vue         galerie de captures d'une fiche + grande vue (<dialog>)
    Roadmap.vue                feuille de route : pince, barre bleue, 5 étapes, boucle de retour
    Clipping.vue               coupure de journal : papier, bord découpé, rotation, grain
    Portrait.vue               photo avec coins
  content/                     données, pas de texte en dur dans les composants
    site.ts                    nom, titre, e-mail, liens GitHub/LinkedIn, zone
    projects.ts                les trois fiches
    roadmap.ts                 les cinq étapes
    clippings.ts               les trois annonces
  pages/index.vue
public/
  favicon.svg, favicon-180.png, favicon-512.png (fournis)
  images/ (fournis : affiche, captures, portrait, logos)
```

Tous les textes viennent des fichiers `content/*.ts`, jamais des composants. `content/*.ts` est la source directe : les textes s'y éditent sur place, il n'y a plus de fichier `textes.md` intermédiaire à recopier mot pour mot (voir `docs/adr/0001-abandon-textes-md.md`).

## Design, ce qui ne se négocie pas
- Palette et polices : `tokens.css`. Règle de couleur : corail = action, bleu pétrole = état et données, moutarde = attention. Le trio ensemble uniquement dans le liseré sous la nav.
- Objets imprimés : affiche (cadre, passe-partout, ombre dure, rotation 1,5°), feuille de route (rotation 1°, pince, ombre dure), coupures (rotations −2°, 1,5°, −1°, chevauchement 12 à 14 px sur les marges, jamais sur le texte, bord découpé en `clip-path`, grain via SVG `feTurbulence` à 6 %, pas d'ombre), captures et portrait (coins photo, rotation 1°).
- Boutons : ombre dure 4 px ; au survol le bouton descend de 2 px, l'ombre passe à 2 px, fond corail assombri #C4533A. Jamais de noir au survol.
- Aucun dégradé, aucun italique, aucun arrondi supérieur à 2 px hors affiche et logo.
- Mobile (< 760 px) : rotations à 0°, coupures empilées sans chevauchement, onglets des fiches alignés à gauche, nav réduite à la marque + bouton Contact.

## Accessibilité et SEO
- HTML sémantique : `header`, `nav`, `main`, `section` avec titres h1/h2, `footer`.
- Contraste : le crème sur corail est limite pour du petit texte ; boutons en 15 px minimum, graisse 600.
- `alt` sur toutes les images (l'affiche : "Affiche de course automobile années 50, trois monoplaces"). Les images décoratives en `alt=""`.
- Focus visible (contour corail 3 px) sur tous les liens et boutons.
- Meta : titre et description dans `meta` de `app/content/site.ts` (positionnement local Cavaillon depuis sept. 2026), Open Graph avec l'image 1200 × 630 `public/og-image.jpg`, `lang="fr"`.
- Adresse canonique : **https://www.gaelle-briet.fr**, avec `www` (`site.url`). L'apex n'est pas branché ; s'il l'est un jour, il redirige vers `www`.
- E-mail : lien `mailto:` normal. Pas d'obfuscation JS, pas de formulaire.

## Performance
- Objectif Lighthouse 95+ partout. Le site fait une page et une dizaine d'images, il n'y a aucune raison d'être en dessous.
- Affiche du hero : WebP 1200 px, `fetchpriority="high"`. Le reste en lazy.
- Aucun JS de Nuxt en production (`features.noScripts: 'production'`). Deux exceptions, en scripts inline sur l'accueil : la vidéo de l'affiche (`app/assets/js/poster-video.js` : en boucle au survol à la souris ; sur écran tactile, une lecture à l'apparition puis au toucher) et les galeries des fiches projet (`app/assets/js/project-gallery.js`). Aucune autre animation en boucle. Voir `docs/adr/0003-zero-js-script-inline.md`.

## Déploiement Cloudflare Pages
Procédure complète dans le README, section « Déploiement ». Les réglages qui s'écartent d'un Nuxt standard sont voulus :
- Build output directory : `dist`, pas `.output/public` (Nitro bascule sur le preset `cloudflare-pages-static`).
- `NODE_VERSION` = `22` : Nuxt 4.5 exige Node 22.19 ou plus.
- Domaine et zone DNS chez **Infomaniak** : seul `www` pointe vers Pages (CNAME). Les MX et TXT servent au courrier (Proton), on n'y touche pas.

Chaque push sur `main` redéploie. Les branches produisent des URL de prévisualisation, utile pour valider une modification avant de merger.

## Livrables attendus de Claude Code, dans l'ordre
1. Squelette Nuxt + tokens + polices + une page vide qui build et passe `nuxt generate`.
2. Header, hero, footer.
3. Fiches projet.
4. Feuille de route.
5. Section "Travaillons ensemble" avec portrait et coupures.
6. Mobile.
7. Meta, OG, accessibilité, Lighthouse.
8. Fichiers de déploiement (`_redirects`, README avec la procédure Cloudflare).

À chaque étape : montrer le rendu, attendre validation, puis passer à la suivante.

## Dossier `_reference/`
- Contient l'export HTML de la maquette et ses captures d'écran (à ajouter : `desktop-1280.png`, `mobile-390.png`, pleine page). Lecture seule : y prendre des valeurs (tailles, espacements, rotations), ne jamais en copier le code ni les styles.
- Les captures d'écran sont la vérité visuelle. En cas de doute entre le HTML et les captures, les captures gagnent.
