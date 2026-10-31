// Animações são opcionais: a página já deve funcionar antes da biblioteca carregar.
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
let anime;
const running = new Set();

// Carrega Anime.js só quando a pessoa não pediu redução de movimento.
export async function initMotion() {
  if (media.matches) return;
  try {
    anime = await import('../assets/vendor/animejs/anime.esm.min.js');
    if (media.matches) return;
    reveal(document.querySelectorAll('[data-enter]'), true);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal([entry.target]);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    media.addEventListener('change', () => {
      if (!media.matches) return;
      observer.disconnect();
      running.forEach(animation => animation.complete());
      running.clear();
    });
  } catch {
    // Animação é melhoria progressiva: o conteúdo nunca começa oculto no CSS.
  }
}

// Faz aparecer um grupo de elementos e registra a animação para encerrá-la depois.
export function reveal(elements, stagger = false) {
  if (!anime || media.matches || !elements.length) return;
  const animation = anime.animate(elements, {
    opacity: [0, 1], y: [18, 0], duration: 650,
    delay: stagger ? anime.stagger(85) : 0,
    ease: 'out(3)',
    onComplete: self => running.delete(self),
  });
  running.add(animation);
}
