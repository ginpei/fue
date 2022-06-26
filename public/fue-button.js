// @ts-check

const apiUrl = location.hostname === "localhost"
  ? "http://127.0.0.1:5001/ginpei-fue/us-central1/report"
  : "https://us-central1-ginpei-fue.cloudfunctions.net/report";

class FueButton extends HTMLElement {
  #watchingSelection = false;

  get apiUrl() {
    return apiUrl;
  }

  get values() {
    const elForm = this.#ref("form");
    if (!(elForm instanceof HTMLFormElement)) {
      throw new Error("HTMLFormElement expected");
    }

    const formValues = {};
    for (const el of elForm.elements) {
      if (
        !(el instanceof HTMLInputElement) &&
        !(el instanceof HTMLSelectElement) &&
        !(el instanceof HTMLTextAreaElement)
      ) {
        continue;
      }

      if (!el.name) {
        throw new Error("name required");
      }

      formValues[el.name] = el.value;
    }

    const compositeValues = {
      ...formValues,
      url: location.href,
      bookId: "x",
    };
    return compositeValues;
  }

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

        .buttonTooltip {
          background-color: var(--theme-color);
          color: white;
          display: none;
          padding: 0.5em;
          pointer-events: none;
          width: max-content;
        }
          .button:hover + .buttonTooltip {
            display: block;
          }

        .completeTooltip {
          background-color: green;
          color: white;
          display: none;
          padding: 0.5em;
          pointer-events: none;
          width: max-content;
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
          padding: 1em;
          position: fixed;
          right: 8px;
          max-width: calc(90vw - 20px - 2em);
        }
          .form--visible {
            display: block;
          }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 1em;
        }

        h1.form-heading {
          font-size: 1em;
          margin: 0;
        }

        .form-group{
          border-style: none;
          margin: 0;
          padding: 0;
        }

        .form-error {
          color: red;
          display: none;
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
        <button class="button" data-ref="button">
          🤔
        </button>
        <div class="buttonTooltip">修正依頼</div>
        <div class="completeTooltip" data-ref="completeTooltip">
          送信しました
        </div>
      </div>
      <form class="form" data-ref="form">
        <fieldset class="form-group" data-ref="form-group">
          <h1 class="form-heading">修正依頼</h1>
          <div class="form-error" data-ref="form-error"></div>
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
        </fieldset>
      </form>
    `;

    this.#ref("button").addEventListener("click", (event) =>
      this.#onClick(event)
    );
    this.#ref("form").addEventListener("submit", (event) =>
      this.#onSubmit(event)
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

    this.toggle();

    this.#querySelector("[autofocus]").focus();
  }

  /**
   * @param {SubmitEvent} event
   */
  async #onSubmit(event) {
    event.preventDefault();

    const elForm = this.#ref("form");
    if (!(elForm instanceof HTMLFormElement)) {
      throw new Error("HTMLFormElement expected");
    }

    const elGroup = this.#ref("form-group");
    if (!(elGroup instanceof HTMLFieldSetElement)) {
      throw new Error("HTMLFieldSetElement expected");
    }

    elGroup.disabled = true;
    this.#renderError(null);

    try {
      const res = await fetch(this.apiUrl, {
        method: "POST",
        body: JSON.stringify(this.values),
      });
      if (!res.ok) {
        const body = await res.json();
        console.log(body);
        throw new Error(`${res.status} ${res.statusText}`);
      }

      elForm.reset();
      this.toggle(false);

      const elTooltip = this.#ref("completeTooltip");
      elTooltip.style.display = "block";
      setTimeout(() => elTooltip.style.display = "", 3000);
      
    } catch (error) {
      this.#renderError(error);
    } finally {
      elGroup.disabled = false;
    }
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
   * @param {boolean} [force]
   */
  toggle(force) {
    this.#ref("form").classList.toggle("form--visible", force);
  }

  /**
   * @param {unknown} error
   */
  #renderError(error) {
    const el = this.#ref("form-error");

    if (!error) {
      el.style.display = "";
      el.textContent = "";
      return;
    }

    console.error(error);

    const certainError = error instanceof Error
      ? error
      : new Error(String(error));

    el.style.display = "block";
    el.textContent = certainError.message;
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
