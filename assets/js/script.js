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

  // --- MÓDULO: ACESSIBILIDADE ---
  const A11y = {
    init() {
      selectAll("nav a").forEach((link) => {
        link.addEventListener("focus", () =>
          link.classList.add("focus-visible"),
        );
        link.addEventListener("blur", () =>
          link.classList.remove("focus-visible"),
        );
      });
    },
    trapFocus(modal) {
      const focusableElementsSelector =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableElements = modal.querySelectorAll(
        focusableElementsSelector,
      );

      if (focusableElements.length === 0) return;

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      this.handleKeyDown = function (e) {
        const isTabPressed = e.key === "Tab" || e.keyCode === 9;
        const isEscPressed = e.key === "Escape" || e.keyCode === 27;

        if (isEscPressed) {
          Projects.closeModal();
          return;
        }

        if (!isTabPressed) return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener("keydown", this.handleKeyDown);
      firstFocusableElement.focus();
    },
    releaseFocus() {
      if (this.handleKeyDown) {
        document.removeEventListener("keydown", this.handleKeyDown);
      }
    },
  };

  // --- MÓDULO: PROJETOS E MODAL ---
  const Projects = {
    lastFocusedElement: null,

    init() {
      this.setupFilters();
      this.setupModal();
      this.setupCardAnimations();
      this.formatDescriptions();
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
    setupModal() {
      const modal = select("#project-modal");
      const closeButton = select("#modal-close");

      selectAll("[data-details]").forEach((button) => {
        button.addEventListener("click", (e) => {
          const article = button.closest(".proj");
          if (article) this.openModal(article, e.currentTarget);
        });
      });

      if (closeButton) {
        closeButton.addEventListener("click", () => this.closeModal());
      }

      if (modal) {
        modal.addEventListener("click", (event) => {
          if (event.target === modal) this.closeModal();
        });
      }
    },
    openModal(article, triggerBtn) {
      const modal = select("#project-modal");
      if (!modal) return;

      this.lastFocusedElement = triggerBtn;

      const title = article.querySelector("h3").textContent;
      const sourceHighlights = article.querySelector(".project-highlights");

      const modalTitle = select("#modal-title");
      const modalDescription = select("#modal-description");
      const modalHighlights = select("#modal-highlights");
      const modalDemo = select("#modal-demo");
      const modalCode = select("#modal-code");

      if (modalTitle) modalTitle.textContent = title;

      if (modalDescription) {
        modalDescription.textContent = "";
        modalDescription.hidden = true;
      }

      if (modalHighlights) {
        modalHighlights.innerHTML = sourceHighlights
          ? sourceHighlights.innerHTML
          : "";
      }

      // Evita pegar o botão de detalhes, filtrando apenas as tags de ancoragem
      const anchors = selectAll("a", article);
      if (modalDemo && anchors[0]) modalDemo.href = anchors[0].href;
      if (modalCode && anchors[1]) modalCode.href = anchors[1].href;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");

      A11y.trapFocus(modal);
    },
    closeModal() {
      const modal = select("#project-modal");
      if (!modal) return;

      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");

      A11y.releaseFocus();

      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    },
    setupCardAnimations() {
      selectAll(".proj").forEach((card) => {
        card.addEventListener("mouseenter", () =>
          card.classList.add("card-hover"),
        );
        card.addEventListener("mouseleave", () =>
          card.classList.remove("card-hover"),
        );
      });
    },
    formatDescriptions() {
      // Formata a quebra de linha dos textos de resumo de cada projeto
      const projectDescriptions = selectAll(".proj > p");
      const replaceRules = [
        [/\.\s*(Solução:|Solucao:)/g, ".\n$1"],
        [/\.\s*(Resultado:)/g, ".\n$1"],
      ];

      projectDescriptions.forEach((description) => {
        const originalText = description.textContent || "";
        let formattedText = originalText.replace(/\s*\n+\s*/g, " ").trim();
        replaceRules.forEach(([pattern, replacement]) => {
          formattedText = formattedText.replace(pattern, replacement);
        });
        description.textContent = formattedText;
      });
    },
  };

  // --- BOOTSTRAP DA APLICAÇÃO ---
  return {
    init() {
      Core.init();
      A11y.init();
      Projects.init();
    },
  };
})();

document.addEventListener("DOMContentLoaded", () => PortfolioApp.init());
