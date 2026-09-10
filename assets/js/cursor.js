document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");

  // Não substitui o cursor nativo em mobile ou com movimento reduzido.
  if (reduceMotion.matches || coarsePointer.matches) return;

  const cursor = document.querySelector(".custom-cursor");
  const dot = document.querySelector(".custom-cursor__dot");
  const ring = document.querySelector(".custom-cursor__ring");

  if (!cursor || !dot || !ring) return;

  document.documentElement.classList.add("has-custom-cursor");

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let animationFrame;
  let isVisible = false;

  const ease = 0.14;

  function updateCursor() {
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    // Ponto central: resposta imediata.
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;

    // Círculo externo: atraso fluido.
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;

    const distance = Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY);

    // Continua apenas enquanto o círculo ainda estiver alcançando o mouse.
    if (distance > 0.1) {
      animationFrame = requestAnimationFrame(updateCursor);
    } else {
      animationFrame = null;
    }
  }

  function requestUpdate() {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(updateCursor);
    }
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
        cursor.style.visibility = "visible";
        isVisible = true;
      }

      requestUpdate();
    },
    { passive: true },
  );

  document.addEventListener("pointerover", (event) => {
    const clickable = event.target.closest(
      "a, button, input, select, textarea, [role='button'], [data-cursor-hover]",
    );

    cursor.classList.toggle("is-hovering", Boolean(clickable));
  });

  document.addEventListener("pointerout", (event) => {
    const leavingClickable = event.target.closest(
      "a, button, input, select, textarea, [role='button'], [data-cursor-hover]",
    );

    const enteringClickable = event.relatedTarget?.closest?.(
      "a, button, input, select, textarea, [role='button'], [data-cursor-hover]",
    );

    if (leavingClickable && !enteringClickable) {
      cursor.classList.remove("is-hovering");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.visibility = "hidden";
    isVisible = false;
  });

  document.addEventListener("mouseenter", () => {
    if (isVisible) cursor.style.visibility = "visible";
  });
});
