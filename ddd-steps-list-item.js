/**
 * Copyright 2025 eman1230
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 *
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsListItem extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.title = "";
    this.body = "";
    this.count = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      body: { type: String },
      count: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--myddd-test);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          display: inline-flex;
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(
            --ddd-steps-list-label-font-size,
            var(--ddd-font-size-s)
          );
        }

        .index {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: white;
          font-size: 20px;
          font-weight: bold;
          margin-right: 8px;
          vertical-align: top;
          font-weight: 400;
          flex-wrap: nowrap;
          z-index: 1;
        }

        h3 {
          display: inline-block;
          margin: 0px;
          padding-top: 12px;
          font-size: 20px;
        }

        .content {
          max-width: 480px;
          align-items: center;
        }

        ::slotted(ddd-steps-list-item) {
          --myddd-test: #000140;
          display: flex;
        }

        .text {
          padding-left: 48px;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
  <div class="wrapper">
    <span class="index">
        ${this.count}
    </span>
      <div class="content">
        <h3>${this.title}</h3>
        <slot class="body"></slot>
      </div>
    </div>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);
