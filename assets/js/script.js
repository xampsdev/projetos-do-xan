/**
 * Script modularizado via IIFE (Module Pattern)
 */

const PortfolioApp = (() => {
  // --- UTILS ---
  const selectAll = (selector, context = document) =>
    Array.from(context.querySelectorAll(selector));
  const select = (selector, context = document) =>
    context.querySelector(selector);

  // --- MÓDULO: GERAL E EVENTOS BASE ---
  const Core = {
    init() {
      this.updateYear();
      this.setupSmoothScroll();
    },
    updateYear() {
      const yearSpan = select("#year");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    },
    setupSmoothScroll() {
      selectAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
          const targetId = anchor.getAttribute("href");
          const targetElement =
            targetId && targetId !== "#" ? select(targetId) : null;
          if (!targetElement) return;

          event.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    },
  };

  // --- MÓDULO: PROJETOS ---
  const Projects = {
    init() {
      this.setupFilters();
    },
    setupFilters() {
      const filterButtons = selectAll(".filter-btn");
      const projectCards = selectAll(".proj");

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const filter = button.dataset.filter;

          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          projectCards.forEach((card) => {
            const techList = (card.dataset.tech || "").split(" ");
            const showCard = filter === "all" || techList.includes(filter);
            card.hidden = !showCard;
          });
        });
      });
    },
  };

  // --- BOOTSTRAP DA APLICAÇÃO ---
  return {
    init() {
      Core.init();
      Projects.init();
    },
  };
})();

document.addEventListener("DOMContentLoaded", () => PortfolioApp.init());
