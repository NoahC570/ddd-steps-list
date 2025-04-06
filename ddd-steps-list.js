import { LitElement, html, css } from "lit";

// ddd-steps-list-item definition
class DddStepsListItem extends LitElement {
  static get properties() {
    return {
      step: { type: Number, reflect: true },
    };
  }

  constructor() {
    super();
    this.step = 0;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: var(--ddd-spacing-6, 24px);
      }

      :host(:last-of-type) .step-circle::after {
        display: none; /* 🔧 Hide dotted line after last step */
      }

      .step-wrapper {
        display: flex;
        align-items: flex-start;
        position: relative; /* 🔧 Needed for the vertical line */
      }

      .step-circle {
        position: relative; /* 🔧 Required to position the ::after line */
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1rem;
        margin-right: var(--ddd-spacing-4, 16px);
        background-color: #ddd;
        color: #000;
        flex-shrink: 0; /* 🔧 Prevent shrinking */
      }

      .step-circle::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: calc(
          100% + var(--ddd-spacing-6, 24px)
        ); /* 🔧 Line continues downward */
        background-image: linear-gradient(
          to bottom,
          #ccc 33%,
          rgba(255, 255, 255, 0) 0%
        );
        background-position: right;
        background-size: 2px 8px;
        background-repeat: repeat-y; /* 🔧 Creates dotted line */
      }

      :host([data-primary]) .step-circle {
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: #fff;
      }

      .step-content {
        flex: 1;
      }

      ::slotted(h3) {
        margin: 0;
        font-size: 1.1rem;
        font-weight: bold;
        color: var(
          --ddd-theme-default-beaverBlue,
          #1e407c
        ); /* 🔧 Match visual style */
      }

      ::slotted(p) {
        margin-top: 0.5rem;
        margin-bottom: 0;
        line-height: 1.5;
        color: #333; /* 🔧 Improve readability */
      }
    `;
  }

  render() {
    return html`
      <div class="step-wrapper">
        <div class="step-circle">${this.step}</div>
        <div class="step-content"><slot></slot></div>
      </div>
    `;
  }
}
customElements.define("ddd-steps-list-item", DddStepsListItem);

class DddStepsList extends LitElement {
  static get properties() {
    return {
      dddPrimary: { type: Boolean, attribute: "ddd-primary", reflect: true },
    };
  }

  constructor() {
    super();
    this.dddPrimary = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 800px; /* 🔧 Centered layout like the screenshot */
        margin: 0 auto; /* 🔧 Center horizontally */
      }
    `;
  }

  render() {
    return html`<slot @slotchange="${this._onSlotChange}"></slot>`;
  }

  firstUpdated() {
    this._validateChildren();
  }

  _onSlotChange() {
    this._validateChildren();
  }

  _validateChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;
    children.forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag !== "ddd-steps-list-item") {
        this.removeChild(child);
      } else {
        stepCount++;
        child.step = stepCount;
        if (this.dddPrimary) {
          child.setAttribute("data-primary", "");
        } else {
          child.removeAttribute("data-primary");
        }
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      const items = this.querySelectorAll("ddd-steps-list-item");
      items.forEach((item) => {
        if (this.dddPrimary) {
          item.setAttribute("data-primary", "");
        } else {
          item.removeAttribute("data-primary");
        }
      });
    }
  }
}
customElements.define("ddd-steps-list", DddStepsList);
