import {LitElement, html, css} from 'lit';
import {getTranslation} from '../translation';
import {store} from '../store';

export class EmployeeManagement extends LitElement {
  static get styles() {
    return css`
      .red {
        color: crimson;
      }
    `;
  }

  constructor() {
    super();
    store.subscribe(() => this.handleRouteChange());
  }

  handleRouteChange() {
    this.requestUpdate();
  }

  renderRoutedComponent() {
    const path = store.getState().route.location.path;
    switch (path) {
      case 'employees':
        return html`<employee-records></employee-records>`;
      case 'addEditEmployee':
        return html`<add-edit-employee></add-edit-employee>`;
      default:
        return html`<add-edit-employee></add-edit-employee>`;
    }
  }

  render() {
    return html`
      <h1>${getTranslation('employeeManagement')}</h1>
      <navigation-c></navigation-c>
      ${this.renderRoutedComponent()}
    `;
  }
}

customElements.define('employee-management', EmployeeManagement);
