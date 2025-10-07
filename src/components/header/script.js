class AppSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    // const isLocal =
    //   window.location.hostname === "localhost" ||
    //   window.location.hostname === "127.0.0.1";
    // const basePath = isLocal ? "/src" : "";
    const basePath = "/src";

    try {
      const response = await fetch(`${basePath}/components/sidebar/index.html`);
      if (!response.ok) {
        throw new Error("Não foi possível carregar o template do sidebar.");
      }
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      const template = doc.getElementById("template-app-sidebar");

      if (template) {
        const templateContent = template.content.cloneNode(true);

        const globalStyles = document.createElement("link");
        globalStyles.setAttribute("rel", "stylesheet");
        globalStyles.setAttribute("href", `${basePath}/assets/global.css`);

        const componentStyles = document.createElement("link");
        componentStyles.setAttribute("rel", "stylesheet");
        componentStyles.setAttribute(
          "href",
          `${basePath}/components/sidebar/style.css`
        );

        this.shadowRoot.appendChild(globalStyles);
        this.shadowRoot.appendChild(componentStyles);
        this.shadowRoot.appendChild(templateContent);

        const currentPath = window.location.pathname;
        const links = this.shadowRoot.querySelectorAll("a");

        links.forEach(link => {
          const linkPath = new URL(link.href, window.location.origin).pathname;

          if (linkPath === currentPath) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      } else {
        console.error(
          "Template 'template-app-sidebar' não encontrado dentro de sidebar/index.html."
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}

customElements.define("app-sidebar", AppSidebar);
