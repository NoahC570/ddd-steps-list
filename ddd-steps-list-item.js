/**
 * Copyright 2025 Noah
 * @license Apache-2.0, see LICENSE for full text.
 */
import { html, css } from "lit";
import { DDDPulseEffectSuper, DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 *
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsListItem extends DDDPulseEffectSuper(I18NMixin(DDD)) {
  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.title = "";
    this.summary = "";
    this.count = 0;
    this.x = this.x || {};

    this.x = {
      ...this.x,
      title: "Header",
    };
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      summary: { type: String },
      count: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
          margin-bottom: 10px;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          margin: 0 var(--ddd-spacing-2);
          padding: 0 var(--ddd-spacing-4);
        }
        .header-content {
          display: flex;
          align-items: center;
        }

        .index {
          display: inline-block;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--ddd-theme-primary);
          color: white;
          font-size: 20px;
          font-weight: 400;
          margin-right: 8px;
          z-index: 1;
        }

        .count {
          padding-left: 19px;
          padding-top: 11px;
        }

        h3 {
          display: inline-block;
          margin: 0;
          padding-top: 12px;
          font-size: 20px;
          margin-left: 12px;
          color: var(--ddd-theme-primary);
        }

        .bodytext {
          display: flex;
          flex-direction: column;
        }

        .content {
          max-width: 720px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-left: 46px;
        }

        .vl {
          display: inline-block;
          margin-left: 23px;
          border-left: 1.5px dashed var(--ddd-theme-default-nittanyNavy);
          height: 100%;
        }

        :host([noline]) .vl {
          border-left: none;
        }

        @media screen and (max-width: 1280px) {
          .content {
            max-width: 1080px;
          }

          .count {
            width: 29px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header-content">
          <div class="index">
            <div class="count">${this.count}</div>
          </div>
          <h3>${this.title}</h3>
        </div>
        <div class="vl">
          <div class="content">
            <div class="bodytext">
              <slot class="summary"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);
