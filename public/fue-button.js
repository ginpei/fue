// @ts-check

class FueButton extends HTMLElement {
  #watchingSelection = false;

  get #selectedText() {
    const selection = this.ownerDocument.getSelection();
    if (!selection || selection.rangeCount < 1) {
      return "";
    }
  
    const range = selection.getRangeAt(0);
    if (
      !range || (
        range.startContainer === range.endContainer &&
        range.startOffset === range.endOffset
      )
    ) {
      return "";
    }
  
    const text = range.toString().trim();
    if (!text) {
      return "";
    }

    return text;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const root = this.shadowRoot;
    if (!root) {
      throw new Error("ShadowRoot required");
    }

    root.innerHTML = /*html*/`
      <style>
        :host {
          --theme-color: #036;
          font-size: 16px;
        }

        textarea {
          overscroll-behavior: none;
          resize: none;
        }

        .floating {
          display: flex;
          flex-direction: row-reverse;
          gap: 2px;
          position: relative;
        }

        .button {
          background-color: white;
          border-radius: 2px;
          border: thin solid var(--theme-color);
          box-shadow: 0 0 4px #0003;
          cursor: pointer;
          font-size: 16px;
          height: 40px;
          width: 40px;
        }
          .button:hover {
            box-shadow: 0 0 0 1px var(--theme-color);
          }

        .popup {
          background-color: var(--theme-color);
          color: white;
          display: none;
          padding: 0.5em;
          pointer-events: none;
          width: max-content;
        }
          .button:hover + .popup {
            display: block;
          }

        .form {
          background-color: white;
          border-color: var(--theme-color);
          border-radius: 2px;
          border-style: solid;
          border-width: 4px thin thin;
          bottom: 60px;
          box-shadow: 0 0 1em #0003;
          display: none;
          flex-direction: column;
          gap: 1em;
          padding: 1em;
          position: fixed;
          right: 8px;
          max-width: calc(90vw - 20px - 2em);
        }
          .form--visible {
            display: flex;
          }

        h1.form-heading {
          font-size: 1em;
          margin: 0;
        }

        label.label {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .label-text {
          font-size: 0.8em;
        }

        .hint {
          color: gray;
          font-size: xx-small;
        }
      </style>
      <div class="floating">
        <button class="button" data-ref="button">🤔</button>
        <div class="popup">修正依頼</div>
      </div>
      <form class="form" data-ref="form">
        <h1 class="form-heading">修正依頼</h1>
        <label class="label">
          <span class="label-text">引用</span>
          <textarea
            data-ref="quote"
            name="quote"
            readonly
          ></textarea>
          <small class="hint">ページ内で文章を選択してください。</small>
        </label>
        <label class="label">
          <span class="label-text">本文</span>
          <textarea autofocus name="message"></textarea>
        </label>
        <small class="hint">その他記録されるもの：URL、IP アドレス、日時</small>
        <button type="submit">送信</button>
      </form>
    `;

    this.#ref("button").addEventListener("click", (event) =>
      this.#onClick(event)
    );
  }

  /**
   * @param {MouseEvent} event
   */
  #onClick(event) {
    if (!this.#watchingSelection) {
      this.#watchingSelection = true;
      this.ownerDocument.addEventListener("selectionchange", () =>
        this.#onSelectionChange()
      )
      this.#onSelectionChange();
    }

    const elForm = this.#ref("form");
    elForm.classList.toggle("form--visible");

    this.#querySelector("[autofocus]").focus();
  }

  #onSelectionChange() {
    const value = this.#selectedText;
    if (!value) {
      return;
    }

    const el = this.#ref("quote");
    if (!(el instanceof HTMLTextAreaElement)) {
      throw new Error("HTMLTextAreaElement expected");
    }

    el.value = value;
  }

  /**
   * @param {string} ref
   */
  #ref(ref) {
    return this.#querySelector(`[data-ref='${ref}']`);
  }

  /**
   * @param {string} selector
   */
  #querySelector(selector) {
    if (!this.shadowRoot) {
      throw new Error("ShadowRoot required");
    }

    const el = this.shadowRoot.querySelector(selector);
    if (!el) {
      throw new Error(`\`${selector}\` not found`);
    }
    if (!(el instanceof HTMLElement)) {
      throw new Error("Not an HTMLElement");
    }

    return el;
  }
}

customElements.define('fue-button', FueButton);
