# gaelle-briet.fr

Site vitrine : une page d'accueil, une étude de cas, les mentions légales.
Nuxt 4 en génération statique, CSS natif, aucune dépendance d'exécution. Le
build produit du HTML, du CSS et des images : **Nuxt ne sert aucun
JavaScript en production**. Deux petits scripts inline font exception, sur
l'accueil seulement : la vidéo de l'affiche et les galeries des fiches
projet (voir « Vidéo de l'affiche » et « Galeries des fiches »).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

## Construire

```bash
npm run generate   # écrit .output/public
npm run preview    # sert le résultat en local
npm run typecheck  # vérifie les types (vue-tsc)
```

`npm run generate` est la commande de déploiement. Elle ne dépend d'aucun
service : le dossier produit se sert tel quel. En local, `dist` est un lien
symbolique vers `.output/public` ; sur Cloudflare, `dist` est le vrai dossier
de sortie (voir « Déploiement »).

## Node

Nuxt 4.5 exige Node **22.19+**, 24.11+ ou 26+. Le fichier `.nvmrc` fixe la
version 22 ; Cloudflare Pages le lit automatiquement.

## Où vivent les textes

Aucun texte n'est écrit dans un composant. Tout est dans `app/content/` :

| Fichier | Contenu |
|---|---|
| `site.ts` | Identité, navigation, hero, méthode, section « Travaillons ensemble », pied de page, meta |
| `projects.ts` | Les trois fiches projet |
| `roadmap.ts` | Les cinq étapes de la feuille de route |
| `clippings.ts` | Les trois petites annonces |
| `mentions-legales.ts` | Page Mentions légales (éditrice, hébergeur, données personnelles) |
| `etude-symbaroum.ts` | Étude de cas Symbaroum Bestiary Manager |

Modifier un texte, c'est modifier un de ces fichiers. Les composants
ne font que la mise en forme.

### Ajouter un projet

Dans `projects.ts`, ajouter une entrée au tableau `projects` :

```ts
{
  index: '04 / 04',
  tab: 'En service',
  status: 'service',        // 'service' | 'construction' | 'libre'
  title: '…',
  text: '…',
  stack: '…',
  images: [
    {
      thumb: {
        src: '/images/projets/mon-projet-ecran-800.webp',
        srcset: '/images/projets/mon-projet-ecran-400.webp 400w, /images/projets/mon-projet-ecran-800.webp 800w',
      },
      full: { src: '/images/projets/mon-projet-ecran-grand.webp', width: 1600, height: 1000 },
      alt: '…',       // ce que montre l'image
      caption: '…',   // légende sous la grande vue
    },
  ],
  action: { label: 'Voir sur GitHub', href: '…', external: true },
}
```

Penser à corriger les `index` des autres fiches (`01 / 04`, etc.).

`status` pilote la couleur de l'onglet et la position : `service` en bleu
pétrole à gauche, `construction` en moutarde au tiers, `libre` en pointillé
à droite. Une fiche sans `images` affiche un cadre vide avec des coins photo.

## Galeries des fiches

Chaque fiche montre ses `images` dans une bande qu'on fait glisser ; un
clic ouvre la grande vue (un `<dialog>`), avec flèches, compteur, légende
et touches ← → / Échap. La première image sert de vignette.

Trois fichiers par image, dans `public/images/projets/` :

| Fichier | Format | Rôle |
|---|---|---|
| `…-800.webp` et `…-400.webp` | 16:10 exactement (800 × 500, 400 × 250) | vignette de la fiche |
| `…-grand.webp` | libre, 1600 px sur le grand côté | grande vue, chargée à l'ouverture seulement |

Pour un écran de téléphone, la vignette est un cadrage 16:10 sur le haut
utile de l'écran, et la grande vue montre l'écran entier :

```bash
# capture 390 × 844 prise en ×3 (1170 × 2532), cadrage à partir de y = 44 px
magick ecran.png -crop 1170x732+0+132 +repage -resize 800x500! -quality 82 mon-projet-ecran-800.webp
magick mon-projet-ecran-800.webp -resize 400x -quality 82 mon-projet-ecran-400.webp
magick ecran.png -resize x1600 -quality 82 mon-projet-ecran-grand.webp
```

Le comportement vient du script inline `app/assets/js/project-gallery.js`
(injecté par `ProjectGallery.vue`, une seule fois pour toutes les fiches).
Sans lui, rien ne casse : la bande glisse au doigt ou au clavier et chaque
vignette ouvre la grande image dans l'onglet. Les captures de Symbaroum
viennent de la démo en ligne (`?demo`), celles de MémoPatte du carnet de
démo de l'appli (`pnpm dev:data`).

## Design

`app/assets/css/tokens.css` contient toutes les valeurs : couleurs, polices,
tailles, ombres, espacements. C'est le seul endroit à toucher pour un
réglage global.

Règle de couleur : **corail = action**, **bleu pétrole = état et données**,
**moutarde = attention**. Les trois ne cohabitent que dans le liseré sous la
navigation.

Points de rupture :

| Largeur | Ce qui change |
|---|---|
| 1020 px | Coupures à plat et empilées |
| 1000 px | Feuille de route redressée |
| 760 px | Liens de nav masqués, rotations à 0°, onglets à gauche, boucle de retour masquée |
| 560 px | Texte de la marque masqué, la marque reste |

## Polices

Auto-hébergées via `@fontsource`, sous-ensemble latin uniquement. **Aucun
appel à Google Fonts** : pas de requête vers un tiers, donc rien à déclarer
côté RGPD. Les trois fontes du premier écran sont préchargées depuis
`app/app.vue`, via un `import … ?url` pour que le chemin haché par le build
soit toujours le bon.

## Page 404

Cloudflare Pages sert `/404.html` pour toute URL inconnue. Nuxt écrit ce
fichier comme une coquille vide à remplir côté client - inutilisable ici
puisqu'aucun JS n'est servi. Le contournement, dans `nuxt.config.ts` :

1. `app/error.vue` dessine la page d'erreur (seul dessin, réutilisé partout).
2. `app/pages/introuvable.vue` l'affiche sous une route normale, que le
   build prérend en `200` (Nitro refuse de prérendre une réponse `404`).
3. Un hook Nitro `prerender:generate` fait deux choses pendant le prérendu :
   il saute la coquille `/404.html` de Nuxt (`route.skip`) et écrit
   `/introuvable` sous le nom `404.html` (`route.fileName`). Rien n'est
   renommé après coup, aucun dossier `introuvable/` n'existe en sortie, et
   ça ne dépend ni du dossier de sortie ni de l'ordre des hooks.

Le log de build affiche `[404] page /introuvable écrite sous 404.html` :
si cette ligne manque dans un log Cloudflare, le hook n'a pas tourné.
Un hook `close` reste en filet de sécurité (renommage a posteriori) ; il
n'a normalement rien à faire.

Pour modifier le texte du 404, éditer `app/error.vue`.

## Vidéo de l'affiche

L'affiche du hero s'anime : en boucle au survol à la souris. Sur écran
tactile, elle joue une fois d'elle-même quand l'affiche apparaît, puis à
chaque toucher (toucher pendant la lecture l'arrête) ; une consigne
« Touchez l'affiche pour l'animer » s'affiche sous la légende. Rien ne se
charge avant ce déclenchement. Avec le mouvement réduit, jamais
d'animation ; en mode économie de données, pas de lecture automatique.

Nuxt ne servant aucun JS (`features.noScripts`), c'est un petit script
inline qui s'en charge : `app/assets/js/poster-video.js`, injecté par
`HeroPoster.vue`. Pourquoi pas Vue : voir
`docs/adr/0003-zero-js-script-inline.md`.

**Tester sur le build, pas en dev** : `nuxt dev` exécute toujours Vue, donc
un comportement qui dépendrait du JS de Nuxt y marcherait quand même. Pour
voir ce que reçoit un visiteur : `npm run generate`, puis servir
`.output/public`.

Deux formats, le WebM (VP9, 834 ko) en premier et le MP4 (H.264, 1 Mo) en
repli : le Chromium de certaines distributions Linux n'a pas de décodeur
H.264. Pour ré-encoder le WebM depuis une nouvelle source :

```bash
ffmpeg -i source.webm -c:v libvpx-vp9 -b:v 0 -crf 45 -row-mt 1 -pass 1 -an -f null /dev/null
ffmpeg -i source.webm -c:v libvpx-vp9 -b:v 0 -crf 45 -row-mt 1 -pass 2 -an \
       public/videos/affiche-course.webm
```

## Image Open Graph

Le gabarit est dans `tools/og-image.html`. Pour régénérer
`public/og-image.jpg` après un changement de titre ou d'affiche :

```bash
python3 -m http.server 8080 &          # servir la racine du projet
chromium --headless --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot=/tmp/og.png http://127.0.0.1:8080/tools/og-image.html
magick /tmp/og.png -quality 88 -strip public/og-image.jpg
```

## Déploiement - Cloudflare Pages

Chaque push sur `main` redéploie. Les autres branches produisent une URL de
prévisualisation, pratique pour valider une modification avant de fusionner.

### 1. Créer le projet

1. Pousser le dépôt sur GitHub (`GaelleBriet/gaelle-briet.fr`, public ou privé).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → choisir le dépôt.
3. Paramètres de build :

   | Champ | Valeur |
   |---|---|
   | Framework preset | Nuxt |
   | Build command | `npm run generate` |
   | Build output directory | **`dist`** |
   | Variable d'environnement | `NODE_VERSION` = `22` |

4. Lancer le premier déploiement et vérifier le résultat sur l'URL
   `*.pages.dev` avant de brancher le domaine.

> **Pourquoi `dist` et pas `.output/public`** : sur Cloudflare, Nitro
> détecte l'environnement et bascule sur le preset `cloudflare-pages-static`,
> qui écrit dans `dist` - et y ajoute `_headers` (cache d'un an sur
> `/_nuxt/*`) et la ligne `/* /404.html 404` dans `_redirects`. En local
> le preset reste `static` (sortie `.output/public`) mais `dist` existe
> aussi, en lien symbolique. `dist` est donc juste dans les deux cas.

> La variable `NODE_VERSION` fait doublon avec `.nvmrc`, mais elle rend la
> version explicite dans l'interface. **Ne pas mettre 20** : Nuxt 4.5 ne
> démarre pas en dessous de Node 22.19.

#### Si Cloudflare propose le formulaire Workers

Cloudflare met parfois en avant le formulaire **Workers** (reconnaissable à
la commande `npx wrangler deploy`). Ce site est prévu pour **Pages** : dans
« Créer une application », choisir l'onglet **Pages**. Ne pas ajouter de
`wrangler.jsonc` à la racine - Pages refuse la clé `assets` et le build
échoue.

### 2. Brancher le domaine

Le domaine **et sa zone DNS** sont chez **Infomaniak**. Seul `www` pointe
vers le site : un CNAME `www` → `gaelle-briet-fr.pages.dev`, créé dans le
Manager Infomaniak, puis `www.gaelle-briet.fr` ajouté dans Projet Pages →
**Custom domains**. L'apex (`gaelle-briet.fr` sans `www`) n'a aucun
enregistrement et ne répond pas. Toute modification DNS (TXT de
vérification, etc.) se fait donc chez Infomaniak.

```bash
dig +short NS gaelle-briet.fr            # nsany1/2.infomaniak.com
dig +short CNAME www.gaelle-briet.fr     # gaelle-briet-fr.pages.dev.
```

#### Si un jour on branche l'apex

Pages ne sait servir l'apex que si la zone DNS est chez Cloudflare. Il
faudrait donc y déplacer la zone ; le domaine, lui, resterait chez
Infomaniak, seuls les serveurs de noms changeraient.

L'e-mail (`hello@`) passe par Proton, avec Infomaniak en secours : la zone
contient donc des MX, SPF, DKIM, DMARC, SRV et CNAME d'autoconfiguration
qu'il faut **recopier à l'identique** - rien de tout ça ne concerne le site,
mais tout ça concerne le courrier.

1. Cloudflare → **Ajouter un domaine** (ou « Commencer le transfert DNS »
   depuis Pages) → `gaelle-briet.fr`, offre gratuite.
2. **Ne pas se fier au scan automatique** : il ne peut pas deviner les
   sélecteurs DKIM ni les SRV. Importer plutôt le fichier de zone
   (DNS → Records → *Import and Export*), en laissant **tous** les
   enregistrements en « DNS only » (nuage gris) - ce sont des
   enregistrements de courrier, le proxy les casserait.
3. Chez Infomaniak → domaine → **Serveurs de noms** → serveurs
   personnalisés → les deux `*.ns.cloudflare.com` indiqués par Cloudflare.
4. Attendre que Cloudflare déclare la zone **active**, puis s'envoyer un
   mail à `hello@` pour vérifier que le courrier arrive toujours.
5. Projet Pages → **Custom domains** → ajouter `gaelle-briet.fr`, puis la
   redirection vers `www` décrite dans « Adresse canonique ».
6. Attendre que le certificat HTTPS soit actif avant de communiquer l'URL.

Vérifier après coup, depuis un terminal :

```bash
dig +short MX gaelle-briet.fr            # 3 lignes : Proton 10 et 20, Infomaniak 25
dig +short TXT _dmarc.gaelle-briet.fr    # UNE seule ligne
dig +short CNAME protonmail2._domainkey.gaelle-briet.fr   # …domains.proton.ch.
```

### 3. Adresse canonique

Le site est servi sur **`https://www.gaelle-briet.fr`** : c'est l'URL que
déclarent la balise `<link rel="canonical">`, les balises Open Graph, le
`sitemap.xml` et `robots.txt` (tous dérivés de `site.url` dans
`app/content/site.ts`). L'apex (`gaelle-briet.fr` sans `www`) n'est pas
branché ; le jour où il l'est, il faudra le rediriger vers `www` via un
fichier `public/_redirects` :

```
https://gaelle-briet.fr/* https://www.gaelle-briet.fr/:splat 301
```

## Ce que le site n'a pas, volontairement

- Pas de JavaScript de Nuxt en production, donc pas de coût d'hydratation.
  Les seuls scripts sont inline, sur l'accueil : vidéo de l'affiche et
  galeries des fiches, 5 ko à eux deux.
- Pas de script tiers, pas d'analytics, pas de cookie, pas de bandeau.
  Si un jour c'est nécessaire : Cloudflare Web Analytics, qui ne pose pas
  de cookie. Rien d'autre.
- Pas de formulaire de contact. Un lien `mailto:` classique, sans
  obfuscation JavaScript.
- Pas de back-end, pas de base de données.

## Mesures

Lighthouse sur un serveur avec gzip et `Cache-Control`, équivalent à ce que
sert Cloudflare Pages :

| | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Mobile | 99–100 | 96 | 100 | 100 |
| Desktop | 100 | 96 | 100 | 100 |

Le score mobile oscille d'un point d'un run à l'autre sur le même build :
c'est le bruit de mesure de Lighthouse, pas une régression.

Accueil au chargement, en mobile : **264 ko transférés en 16 requêtes**,
dont les 7 vignettes des galeries, LCP 2,1 s en mobile bridé, CLS 0,
TBT 0 ms (mesuré le 28 septembre 2026). Le portrait et le sceau, plus bas,
se chargent au défilement ; les grandes images des galeries, à l'ouverture. La vidéo
(834 ko) s'ajoute sur écran tactile quand l'affiche apparaît, et à la
souris au premier survol. En desktop, Lighthouse la compte : son Chrome
headless n'a pas de souris et se comporte comme un écran tactile.

### Limite d'accessibilité connue

Trois combinaisons de la palette passent sous le seuil AA de 4,5:1 :

| Combinaison | Ratio | Où |
|---|---|---|
| Crème sur corail | 2,98:1 | Boutons d'action |
| Corail sur crème | 3,17:1 | Numéros de la feuille de route |
| Bleu pétrole sur papier | 4,42:1 | Libellés des coupures |

C'est un arbitrage assumé : la palette fait l'identité du site. Le premier
cas est structurel - même du texte encre sur corail ne dépasse pas 3,8:1, et
aucune taille de caractère ne compense un écart de contraste. Y remédier
supposerait d'assombrir le corail au-delà de #DC6247.

En compensation, les boutons sont en 15 px graisse 600, le focus est visible
partout (contour corail 3 px), la page a un lien d'évitement, et la structure
est entièrement sémantique.
