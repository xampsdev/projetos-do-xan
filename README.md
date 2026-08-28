# Alexandre (Xan) Araujo | Portfólio Front-end

Este é o repositório do meu portfólio profissional, desenvolvido para demonstrar minhas capacidades práticas na construção de interfaces web modernas, responsivas e acessíveis.

🔗 **Visualizar o projeto ao vivo:** [https://alexandrexan.github.io/projetos-do-xan/](https://alexandrexan.github.io/projetos-do-xan/)

---

## Objetivo do Projeto

O objetivo deste portfólio não é apenas listar o que eu sei, mas **demonstrar tecnicamente** meu domínio dos fundamentos da web. Em vez de utilizar templates ou frameworks pesados desnecessariamente, optei por construir toda a aplicação utilizando a stack web nativa (Vanilla), garantindo controle total sobre a arquitetura, performance e acessibilidade.

## Stack Tecnológica

O projeto foi construído utilizando os fundamentos do Front-end:

*   **HTML5:** Estrutura estritamente semântica.
*   **CSS3:** Arquitetura Mobile-First, CSS Grid, Flexbox e Custom Properties (variáveis).
*   **JavaScript (Vanilla):** Lógica modular (Module Pattern), manipulação limpa do DOM e eventos.

## Decisões de Arquitetura e Engenharia

Para garantir um código de nível profissional e de fácil manutenção, apliquei os seguintes conceitos:

### 1. Acessibilidade (A11y) levada a sério
*   **Focus Trap no Modal:** Implementação de uma trava de foco via JavaScript para garantir que usuários navegando por teclado (Tab) não interajam com elementos invisíveis atrás do modal quando ele estiver aberto. Ao fechar, o foco é devolvido ao elemento acionador original.
*   **Navegação por Teclado:** Utilização consistente do pseudo-seletor `:focus-visible` e presença de um `skip-link` para pular diretamente para o conteúdo principal.

### 2. Responsividade e Performance
*   **Design Fluido:** Utilização da função `clamp()` do CSS para que a tipografia e os espaçamentos escalem de forma orgânica em qualquer tamanho de tela (do mobile ao monitor ultrawide), reduzindo a dependência excessiva de *media queries*.
*   **Performance:** Imagens configuradas com o atributo nativo `loading="lazy"` para otimizar o tempo de carregamento inicial (LCP - Largest Contentful Paint).

### 3. JavaScript Modular
*   Código JS encapsulado em uma IIFE (Immediately Invoked Function Expression) sob o padrão *Module Pattern*, dividindo responsabilidades claras entre `Core`, `A11y` e `Projects` para evitar poluição do escopo global e facilitar a manutenção.

## Contato
Estou aberto a oportunidades como Desenvolvedor Front-end Junior.

Email: xampsbeatz@gmail.com

LinkedIn: linkedin.com/in/alexandreap/

GitHub: github.com/xampsdev
