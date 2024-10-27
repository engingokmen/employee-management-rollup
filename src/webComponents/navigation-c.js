import {LitElement, html, css} from 'lit';
import {getTranslation} from '../translation';
import {store, toEmployeesPage, toAddEditEmployeePage} from '../store';
import {buttonStyles} from '../styles/button-style';

export class Navigation extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        ul {
          list-style-type: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 20px;

          & a {
            text-decoration: none;
            color: var(--blue);

            &:hover {
              color: var(--lightBlue);
            }
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  toEmployees() {
    store.dispatch(toEmployeesPage());
  }

  toAddEditEmployee() {
    store.dispatch(toAddEditEmployeePage());
  }

  render() {
    return html`
      <nav>
        <ul>
          <li>
            <button @click=${this.toEmployees} class="primary">
              ${getTranslation('employees')}
            </button>
          </li>
          <li>
            <button @click=${this.toAddEditEmployee} class="primary">
              ${getTranslation('addEmployee')}
            </button>
          </li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('navigation-c', Navigation);
