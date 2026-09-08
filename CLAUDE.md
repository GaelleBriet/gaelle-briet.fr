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
- CSS natif avec variables (fichier `tokens.css` fourni). Pas de Tailwind, pas de framework CSS.
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
- Meta : `<title>` "Gaëlle Briet · Développeuse web, approche produit", description de 150 caractères tirée du pitch, Open Graph avec une image 1200 × 630 à générer depuis l'affiche et le titre, `lang="fr"`, canonical sur https://gaelle-briet.fr.
- E-mail : lien `mailto:` normal. Pas d'obfuscation JS, pas de formulaire.

## Performance
- Objectif Lighthouse 95+ partout. Le site fait une page et une dizaine d'images, il n'y a aucune raison d'être en dessous.
- Affiche du hero : WebP 1200 px, `fetchpriority="high"`. Le reste en lazy.
- Pas de JS côté client hors ce que Nuxt génère ; aucune animation en boucle.

## Déploiement Cloudflare Pages
1. Repo GitHub `GaelleBriet/gaelle-briet.fr` (public ou privé, au choix).
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → choisir le repo.
3. Paramètres de build :
   - Framework preset : Nuxt
   - Build command : `npm run generate`
   - Build output directory : `.output/public`
   - Variable d'environnement : `NODE_VERSION` = `20` (ou la version LTS courante)
4. Premier déploiement sur `*.pages.dev` pour vérifier.
5. Custom domains : ajouter `gaelle-briet.fr` et `www.gaelle-briet.fr`. Cloudflare affiche la cible CNAME.
6. Chez Hostinger, zone DNS du domaine :
   - `www` : CNAME vers la cible fournie par Cloudflare
   - apex `@` : CNAME vers la même cible si Hostinger accepte le CNAME sur l'apex, sinon les enregistrements A/AAAA indiqués par Cloudflare
   - ne pas toucher aux MX ni aux TXT existants (e-mail)
7. Redirection `www` → apex : fichier `public/_redirects` avec `https://www.gaelle-briet.fr/* https://gaelle-briet.fr/:splat 301`.
8. HTTPS automatique. Vérifier que le certificat est actif avant de communiquer l'URL.

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
