# gaelle-briet.fr

Site vitrine d'une page. Nuxt 4 en génération statique, CSS natif, aucune
dépendance d'exécution. Le build produit du HTML, du CSS et des images :
**aucun JavaScript n'est servi en production**.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

## Construire

```bash
npm run generate   # écrit .output/public
npm run preview    # sert le résultat en local
```

`npm run generate` est la commande de déploiement. Elle ne dépend d'aucun
service : le dossier produit se sert tel quel.

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

Modifier un texte, c'est modifier un de ces quatre fichiers. Les composants
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
  image: {
    src: '/images/mon-projet-800.webp',
    srcset: '/images/mon-projet-400.webp 400w, /images/mon-projet-800.webp 800w',
    sizes: '(max-width: 640px) calc(100vw - 108px), (max-width: 960px) calc(50vw - 67px), 317px',
    width: 800, height: 500,
    alt: '…',
  },
  action: { label: 'Voir sur GitHub', href: '…', external: true },
}
```

Penser à corriger les `index` des autres fiches (`01 / 04`, etc.) et à
générer la variante 400 px de la capture :

```bash
magick public/images/mon-projet-800.webp -resize 400x -quality 82 \
       public/images/mon-projet-400.webp
```

`status` pilote la couleur de l'onglet et la position : `service` en bleu
pétrole à gauche, `construction` en moutarde au tiers, `libre` en pointillé
à droite. Une fiche sans `image` affiche un cadre vide avec des coins photo.

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
fichier comme une coquille vide à remplir côté client — inutilisable ici
puisqu'aucun JS n'est servi. Le contournement, dans `nuxt.config.ts` :

1. `app/error.vue` dessine la page d'erreur (seul dessin, réutilisé partout).
2. `app/pages/introuvable.vue` l'affiche sous une route normale, que le
   build prérend en `200` (Nitro refuse de prérendre une réponse `404`).
3. Le hook `close` renomme `introuvable/index.html` en `404.html` et efface
   le dossier : la page n'est atteignable que par ce chemin.

Pour modifier le texte du 404, éditer `app/error.vue`.

## Image Open Graph

Le gabarit est dans `tools/og-image.html`. Pour régénérer
`public/og-image.jpg` après un changement de titre ou d'affiche :

```bash
python3 -m http.server 8080 &          # servir la racine du projet
chromium --headless --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot=/tmp/og.png http://127.0.0.1:8080/tools/og-image.html
magick /tmp/og.png -quality 88 -strip public/og-image.jpg
```

## Déploiement — Cloudflare Pages

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
   | Build output directory | `.output/public` |
   | Variable d'environnement | `NODE_VERSION` = `22` |

4. Lancer le premier déploiement et vérifier le résultat sur l'URL
   `*.pages.dev` avant de brancher le domaine.

> La variable `NODE_VERSION` fait doublon avec `.nvmrc`, mais elle rend la
> version explicite dans l'interface. **Ne pas mettre 20** : Nuxt 4.5 ne
> démarre pas en dessous de Node 22.19.

### 2. Brancher le domaine

1. Dans le projet Pages → **Custom domains**, ajouter `gaelle-briet.fr`
   **et** `www.gaelle-briet.fr`. Cloudflare affiche la cible CNAME à créer.
2. Chez Hostinger, zone DNS du domaine :
   - `www` : CNAME vers la cible fournie par Cloudflare.
   - apex `@` : CNAME vers la même cible si Hostinger l'accepte sur l'apex,
     sinon les enregistrements A/AAAA indiqués par Cloudflare.
   - **Ne toucher ni aux MX ni aux TXT existants** : c'est l'e-mail.
3. Attendre que le certificat HTTPS soit actif avant de communiquer l'URL.

### 3. Redirection www → apex

`public/_redirects` s'en charge, Cloudflare Pages le lit à la racine du
dossier publié :

```
https://www.gaelle-briet.fr/* https://gaelle-briet.fr/:splat 301
```

Le domaine canonique est l'apex ; c'est aussi ce que déclare la balise
`<link rel="canonical">` de la page.

## Ce que le site n'a pas, volontairement

- Pas de JavaScript en production, donc pas de coût d'hydratation.
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
| Mobile | 99–100 | 95 | 100 | 100 |
| Desktop | 100 | 95 | 100 | 100 |

Le score mobile oscille d'un point d'un run à l'autre sur le même build :
c'est le bruit de mesure de Lighthouse, pas une régression.

Page complète, images comprises : **207 ko transférés en 10 requêtes**.
LCP 1,9 s en mobile bridé, CLS 0, TBT 0 ms.

### Limite d'accessibilité connue

Trois combinaisons de la palette passent sous le seuil AA de 4,5:1 :

| Combinaison | Ratio | Où |
|---|---|---|
| Crème sur corail | 2,98:1 | Boutons d'action |
| Corail sur crème | 3,17:1 | Numéros de la feuille de route |
| Bleu pétrole sur papier | 4,42:1 | Libellés des coupures |

C'est un arbitrage assumé : la palette fait l'identité du site. Le premier
cas est structurel — même du texte encre sur corail ne dépasse pas 3,8:1, et
aucune taille de caractère ne compense un écart de contraste. Y remédier
supposerait d'assombrir le corail au-delà de #DC6247.

En compensation, les boutons sont en 15 px graisse 600, le focus est visible
partout (contour corail 3 px), la page a un lien d'évitement, et la structure
est entièrement sémantique.
