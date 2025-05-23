/**
 * Copyright 2025 Noah
 * @license Apache-2.0, see LICENSE for full text.
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./ddd-steps-list-item";

/**
 * `ddd-steps-list`
 *
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "ddd-steps-list";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          margin-top: 50px;
        }
        .description {
          padding-left: 20px;
        }
        .description h3 {
          font-size: 28px;
          margin: 0 0 10px 0;
        }
        .steps-items {
          margin-top: 80px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.index = 0;
    this.title = "";
    this.description = "";

    this.x = this.x || {};
    this.x = {
      ...this.x,
      title: "title",
    };

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      header: { type: String },
      index: { type: Number },
      description: { type: String },
    };
  }

  updated(changedProperties) {
    if (changedProperties.has("title")) {
      this.indexcount();
    }
  }

  firstUpdated(changedProperties) {
    this.indexcount();
  }

  indexcount() {
    const items = this.querySelectorAll("ddd-steps-list-item");
    items.forEach((element, index) => {
      element.count = index + 1;
      console.log(element.count);
    });
  }

  validateChildren() {
    const slot = this.shadowRoot.querySelector("#step-slot");
    if (!slot) {
      console.error("Slot #step-slot not found in shadowRoot.");
      return;
    }
    const assignedElements = slot.assignedElements({ flatten: true });
    assignedElements.forEach((child) => {
      if (child.tagName.toLowerCase() !== "ddd-steps-list-item") {
        console.warn("Invalid Tag");
        child.remove();
      }
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="description">
          <h3>${this.title}</h3>
          ${this.description}
        </div>
        <div class="steps-items">
          <slot id="step-slot"></slot>
        </div>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);
