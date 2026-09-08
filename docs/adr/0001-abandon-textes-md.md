# Abandon de textes.md comme source de vérité des textes

Jusqu'ici, tous les textes du site étaient validés dans `textes.md` (issu de la maquette Claude Design) puis recopiés mot pour mot dans `content/*.ts`. Cette double étape avait du sens pour valider la maquette, mais devient une friction pour les retouches post-lancement (ex. mention de disponibilité ajoutée en septembre 2026). Décision : `content/*.ts` devient la source directe, éditée sur place ; `textes.md` est supprimé.
