import {LitElement, html, css} from 'lit';
import {router} from '../router';
import {getTranslation} from '../translation';

export class Navigation extends LitElement {
  static get styles() {
    return css`
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
    `;
  }

  static get properties() {
    return {
      linkHref: Object,
    };
  }

  constructor() {
    super();
    this.linkHref = {
      employees: router.location.routes[0].path,
      addEmployee: '/' + router.location.routes[0].children[1].path,
    };
  }

  render() {
    return html`
      <nav>
        <ul>
          <li>
            <a href=${this.linkHref.employees}
              >${getTranslation('employees')}</a
            >
          </li>
          <li>
            <a href=${this.linkHref.addEmployee}
              >${getTranslation('addEmployee')}</a
            >
          </li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('navigation-c', Navigation);
