class AppSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("./components/sidebar/index.html");
      if (!response.ok) {
        throw new Error("Não foi possível carregar o template do sidebar.");
      }
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      const template = doc.getElementById("template-app-sidebar");

      if (template) {
        const templateContent = template.content.cloneNode(true);

        const currentPath = window.location.pathname;

        // const links = templateContent.querySelectorAll("a.header-link");

        // links.forEach(link => {
        //   if (link.pathname === currentPath) {
        //     link.classList.add("active");
        //   }
        // });

        const globalStyles = document.createElement("link");
        globalStyles.setAttribute("rel", "stylesheet");
        globalStyles.setAttribute("href", "/assets/global.css");

        const componentStyles = document.createElement("link");
        componentStyles.setAttribute("rel", "stylesheet");
        componentStyles.setAttribute("href", "/components/sidebar/style.css");

        this.shadowRoot.appendChild(globalStyles);
        this.shadowRoot.appendChild(componentStyles);
        this.shadowRoot.appendChild(templateContent);

        this.shadowRoot.appendChild(templateContent);
      } else {
        console.error(
          "Template 'template-app-header' não encontrado dentro de header.html."
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}

customElements.define("app-sidebar", AppSidebar);
