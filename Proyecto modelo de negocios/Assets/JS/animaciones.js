import anime from "./Librerias/anime.es.js"

var updates = 0;

anime({
  targets: 'prueba .el',
  translateX: 270,
  delay: 1000,
  direction: 'alternate',
  loop: 3,
  easing: 'easeInOutCirc',
  update: function(anim) {
    updates++;
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
    updateLogEl.value = 'updates : '+updates;
  }
});
