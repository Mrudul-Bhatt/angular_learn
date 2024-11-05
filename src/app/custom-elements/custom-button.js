// custom-button.js
class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<button part="button">${this.getAttribute('label') || 'Click Me'}</button>`;
  }

  connectedCallback() {
    this.addEventListener('click', () => alert('Button clicked!'));
  }
}

customElements.define('custom-button', CustomButton);
