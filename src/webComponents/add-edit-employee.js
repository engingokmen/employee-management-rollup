import {LitElement, html, css} from 'lit';
import {Employee, validationSchemaEmployee} from '../class/Employee';
import {camelCaseToTitle} from '../utils';
import {addEmployee, store, toEmployeesPage, updateEmployee} from '../store';
import {classMap} from 'lit/directives/class-map.js';
import {buttonStyles} from '../styles/button-style';
import {getTranslation} from '../translation';

export class AddEditEmployee extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        .wrapper {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
        .red {
          color: crimson;
        }
        .disabled {
          background-color: #f2f2f2;
          pointer-events: none;
        }

        form {
          width: 100%;
          max-width: 460px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;

          & label {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          & button[type='submit'] {
            grid-column-start: 2;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      employee: {type: Object},
      errors: {type: Array},
      location: {type: Object},
      showDialog: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.schema = validationSchemaEmployee;
    this.errors = [];
    this.email = store.getState().route.location.params?.email;
    this.showDialog = false;
    this.result = null;
    this.initializeEmployee();
    store.subscribe(() => {
      this.initializeEmployee();
    });
  }

  get isEditPage() {
    return !!this.email;
  }

  initializeEmployee() {
    this.email = store.getState().route.location.params?.email;
    if (this.email) {
      const employee = store
        .getState()
        .employee.data.find((employee) => employee.email === this.email);
      this.employee = new Employee(...Object.values(employee));
    } else {
      this.employee = new Employee();
    }
  }

  renderInputs() {
    return html`
      ${Object.entries(this.employee).map(([key, value]) => {
        const type = {
          firstName: 'text',
          lastName: 'text',
          dateOfEmployment: 'date',
          birth: 'date',
          phone: 'tel',
          email: 'email',
          department: 'text',
          position: 'text',
        };

        const disabled = classMap({
          disabled: this.isEditPage && key === 'email',
        });
        return html`
          <label>
            ${getTranslation(key)}:
            <input
              type="${type[key]}"
              name="${key}"
              value="${value}"
              class=${disabled}
            />
          </label>
        `;
      })}
    `;
  }

  async onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employee = Object.fromEntries(formData);

    let extendedSchema = this.schema;
    if (!this.isEditPage) {
      // uniqueness of a record
      extendedSchema = this.schema.extend({
        email: this.schema.shape.email.refine((value) => {
          const employees = store.getState().employee.data;
          return !employees.some((employee) => employee.email === value);
        }, 'Email already in use'),
      });
    }

    this.result = await extendedSchema.safeParseAsync(employee);

    if (!this.result.success) {
      this.errors = this.result.error.errors;
    } else {
      if (this.isEditPage) {
        this.showDialog = true;
      } else {
        store.dispatch(addEmployee(this.result.data));
        store.dispatch(toEmployeesPage());
      }
    }
  }

  confirmDialog() {
    store.dispatch(updateEmployee(this.result.data));
    store.dispatch(toEmployeesPage());
  }

  cancelDialog() {
    this.showDialog = false;
  }

  render() {
    return html`
      <div class="wrapper">
        <h2>
          ${this.isEditPage ? getTranslation('edit') : getTranslation('add')}
          ${getTranslation('employee')}
        </h2>
        <form @submit="${this.onsubmit}">
          ${this.renderInputs()}
          <button type="submit" value="Submit" class="primary">
            ${getTranslation('submit')}
          </button>
          <are-you-sure
            .show=${this.showDialog}
            @submit=${this.confirmDialog}
            @cancel=${this.cancelDialog}
            action="${this.isEditPage ? 'edit' : 'add'}"
          ></are-you-sure>
        </form>
        <ul>
          ${this.errors.map(
            (error) =>
              html`
                <li class="red">
                  ${camelCaseToTitle(error.path[0])}: ${error.message}
                </li>
              `
          )}
        </ul>
      </div>
    `;
  }
}

window.customElements.define('add-edit-employee', AddEditEmployee);
