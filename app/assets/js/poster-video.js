// Vidéo de l'affiche du hero. Nuxt ne sert aucun JS en production
// (features.noScripts) : ce fichier est injecté inline par HeroPoster.vue. Voir docs/adr/0003-zero-js-script-inline.md.
//
// Avec une souris : jouée en boucle au survol, arrêtée à la sortie.
// Sur écran tactile : jouée une fois, sans boucle, quand l'affiche apparaît,
// puis à chaque toucher (toucher pendant la lecture l'arrête).
// Rien ne se charge avant ce déclenchement.
(() => {
  const frame = document.querySelector('.poster__frame')
  const video = frame && frame.querySelector('.poster__video')
  if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const READY = 'poster__video--ready'
  let loaded = false
  let wanted = false

  function play() {
    wanted = true
    if (!loaded) {
      loaded = true
      video.insertAdjacentHTML('beforeend',
        `<source src="${video.dataset.webm}" type='video/webm; codecs="vp9"'>`
        + `<source src="${video.dataset.mp4}" type='video/mp4; codecs="avc1.64001E"'>`)
      video.load()
    }
    // Rejeté si la lecture est interrompue ou refusée (mode économie
    // d'énergie sur iOS) : l'affiche fixe reste, c'est très bien.
    video.play().then(() => {
      if (wanted) video.classList.add(READY)
    }, () => {})
  }

  function stop() {
    wanted = false
    video.pause()
    video.currentTime = 0
    video.classList.remove(READY)
  }

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    frame.addEventListener('mouseenter', play)
    frame.addEventListener('mouseleave', stop)
    return
  }

  video.loop = false
  video.addEventListener('ended', stop)
  frame.addEventListener('click', () => (wanted ? stop() : play()))

  // Lecture automatique : pas en mode économie de données (le toucher, lui,
  // reste possible), et seulement après le chargement de la page, pour ne
  // rien disputer à l'affiche fixe.
  if (navigator.connection && navigator.connection.saveData) return
  addEventListener('load', () => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (!wanted) play()
    }, { threshold: 0.6 })
    observer.observe(frame)
  }, { once: true })
})()
