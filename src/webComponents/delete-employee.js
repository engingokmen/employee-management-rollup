import {LitElement, html, css} from 'lit';
import {deleteEmployee, store} from '../store';
import {buttonStyles} from '../styles/button-style';

export class DeleteEmployee extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        .red {
          color: crimson;
        }
      `,
    ];
  }

  static get properties() {
    return {
      id: {type: String},
      showDialog: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.showDialog = false;
  }

  async onclick(event) {
    event.stopPropagation();
    this.showDialog = true;
  }

  confirmDialog() {
    store.dispatch(deleteEmployee(this.id));
    this.showDialog = false;
  }

  cancelDialog() {
    this.showDialog = false;
  }

  render() {
    return html`
      <button @click="${this.onclick}" class="warning">Delete</button>
      <are-you-sure
        .show=${this.showDialog}
        @submit=${this.confirmDialog}
        @cancel=${this.cancelDialog}
        action="delete"
      ></are-you-sure>
    `;
  }
}

window.customElements.define('delete-employee', DeleteEmployee);
