// Galeries des fiches projet. Injecté inline par ProjectGallery.vue, comme
// poster-video.js : Nuxt ne sert aucun JS (docs/adr/0003).
//
// Sans ce script, tout reste utilisable : la bande d'images défile au doigt,
// à la molette ou au clavier, et chaque vignette ouvre la grande image dans
// l'onglet. Le script ajoute les flèches, le compteur et la grande vue.
(() => {
  // Une bande = une piste en scroll-snap, deux flèches, un compteur.
  function strip(root) {
    const track = root.querySelector('[data-strip-track]')
    const prev = root.querySelector('[data-strip-prev]')
    const next = root.querySelector('[data-strip-next]')
    const count = root.querySelector('[data-strip-count]')
    const current = root.querySelector('[data-strip-current]')
    const last = track.children.length - 1

    // Largeur nulle tant que la grande vue est fermée : on reste sur la 1re.
    const index = () => (track.clientWidth ? Math.round(track.scrollLeft / track.clientWidth) : 0)
    const go = (i, behavior = 'smooth') =>
      track.scrollTo({ left: Math.max(0, Math.min(last, i)) * track.clientWidth, behavior })

    function update() {
      const i = index()
      current.textContent = i + 1
      prev.disabled = i === 0
      next.disabled = i === last
    }

    prev.addEventListener('click', () => go(index() - 1))
    next.addEventListener('click', () => go(index() + 1))
    track.addEventListener('scroll', update, { passive: true })
    // Une seule image : ni flèches ni compteur.
    if (last > 0) prev.hidden = next.hidden = count.hidden = false
    update()
    return { go, index, update }
  }

  for (const gallery of document.querySelectorAll('[data-gallery]')) {
    strip(gallery.querySelector('[data-strip="card"]'))

    const dialog = gallery.querySelector('dialog')
    const view = strip(dialog)

    gallery.querySelectorAll('[data-gallery-open]').forEach((link, i) => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        dialog.showModal()
        view.go(i, 'instant')
        view.update()
        dialog.querySelector('[data-gallery-close]').focus()
      })
    })

    dialog.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close())
    // La grande vue couvre l'écran : un clic hors de la fiche et des
    // commandes ferme. Échap est géré par le navigateur.
    dialog.addEventListener('click', (event) => {
      if (!event.target.closest('figure, button, [data-strip-count]')) dialog.close()
    })
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') view.go(view.index() - 1)
      if (event.key === 'ArrowRight') view.go(view.index() + 1)
    })
  }
})()
