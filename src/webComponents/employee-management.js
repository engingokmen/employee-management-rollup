import {LitElement, html, css} from 'lit';
import {getTranslation} from '../translation';

export class EmployeeManagement extends LitElement {
  static get styles() {
    return css`
      .red {
        color: crimson;
      }
    `;
  }

  render() {
    return html`
      <h1>${getTranslation('employeeManagement')}</h1>
      <navigation-c></navigation-c>
      <slot></slot>
    `;
  }
}

customElements.define('employee-management', EmployeeManagement);
