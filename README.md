# Alexandre (Xan) Araujo | Portfólio Desenvolvedor Web

Repositório do meu portfólio profissional, desenvolvido para demonstrar aplicação prática dos fundamentos da web na construção de interfaces modernas, responsivas e acessíveis.

**Visualizar aplicação online:** [https://xampsdev.github.io/projetos-do-xan/](https://xampsdev.github.io/projetos-do-xan/)

---

## Objetivo

Demonstrar domínio prático da stack web nativa (Vanilla) na criação de soluções funcionais e de fácil manutenção. O projeto foi construído sem dependência de bibliotecas ou frameworks pesados, garantindo controle estrito sobre desempenho, renderização e acessibilidade.

## Stack Técnica

* **HTML5:** Marcação semântica com foco em SEO e leitores de tela.
* **CSS3:** Metodologia Mobile-First, Bento Grid assimétrico, CSS Grid, Flexbox e Custom Properties (Design Tokens).
* **JavaScript (ES6+):** Código nativo encapsulado, manipulação limpa do DOM e consumo assíncrono de dados.

## Decisões de Arquitetura e Engenharia

### 1. Acessibilidade (A11y)
* **Focus Trap no Modal:** Controle estrito de foco via script que aprisiona a navegação por teclado (`Tab` / `Shift + Tab`) no modal de detalhes quando aberto, restaurando o foco ao elemento de origem após o fechamento (`Esc` ou botão).
* **Navegação por Teclado:** Utilização de `:focus-visible` com contraste calibrado e `skip-link` para atalho direto ao conteúdo principal.

### 2. Responsividade e Performance
* **Layout Fluido:** Aplicação da função CSS `clamp()` para tipografia e espaçamentos dinâmicos, reduzindo a complexidade de regras de mídia e garantindo adaptação natural de 320px a telas ultrawide.
* **Otimização de Recursos:** Imagens carregadas sob demanda via atributo nativo `loading="lazy"`.

### 3. Modularização em JavaScript
* Lógica estruturada sob o padrão **Module Pattern** (IIFE), isolando responsabilidades entre inicialização global (`Core`), acessibilidade (`A11y`) e renderização/filtros (`Projects`), prevenindo poluição do escopo global.
## Estrutura de Arquivos

```text
├── assets/
│   ├── css/
│   │   └── style.css       # Design tokens, grid e componentes
│   └── js/
│       └── script.js      # IIFE com módulos Core, A11y e Projects
├── favicon/               # Pacote de ícones e manifest
├── img/                   # Otimizações de imagem locais
├── index.html             # Marcação semântica principal
└── README.md              # Documentação técnica
```
## Contato

Disponível para atuação como Desenvolvedor Web em regime remoto ou híbrido.

Email: xampsbeatz@gmail.com

LinkedIn: [https://www.linkedin.com/in/alexandreap/](https://www.linkedin.com/in/alexandreap/)

GitHub: [github.com/xampsdev](https://github.com/xampsdev)
