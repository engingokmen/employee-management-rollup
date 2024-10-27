import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {LoadingEmptyMixin} from '../mixins/LoadingEmptyMixin';
import {fetchEmployees, store, toAddEditEmployeePage} from '../store';
import {AsyncDataController} from '../controllers/AsyncDataController';
import {PaginationController} from '../controllers/PaginationController';
import {buttonStyles} from '../styles/button-style';
import {getTranslation} from '../translation';
import {fetchMockData} from '../store/employeeReducer';

export class EmployeeRecords extends LoadingEmptyMixin(LitElement) {
  static get styles() {
    return [
      buttonStyles,
      css`
        .wrapper {
          margin: 20px 0;

          & .header {
            font-weight: 600;
            background-color: var(--lighterBlue);
          }

          & .row {
            &:nth-child(even) {
              background-color: var(--lighterBlue);
            }
            &:hover {
              background-color: var(--lightBlue);
            }
          }
        }

        .table {
          & .header,
          .row {
            display: grid;
            grid-template-columns: repeat(9, minmax(50px, 1fr));
            grid-template-rows: min-content;
            border-bottom: 1px solid black;

            & .cell {
              padding: 5px;
              word-break: break-all;

              &.cell-header {
                word-break: break-word;
              }
            }
          }
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 12px;

          & .header,
          .row {
            display: inline-flex;
            padding: 6px;
            column-gap: 6px;
          }

          .body {
            display: flex;
            flex-direction: column;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      employees: {attribute: false},
      display: {attribute: false},
    };
  }

  constructor() {
    super();
    this.display = false;
    this.employees = new AsyncDataController(this, fetchEmployees).data;
    this.paginationController = new PaginationController(this, this.employees);
  }

  get isEmptyData() {
    return this.paginationController.paginatedItems.length === 0;
  }

  handleDisplay() {
    this.display = !this.display;
  }

  handleEmployeeClick(e) {
    const clickedEmployee = e.target.closest('.row');
    if (clickedEmployee) {
      const employeeEmail = clickedEmployee.getAttribute('data-email');
      // navigate to edit employee page
      store.dispatch(toAddEditEmployeePage({email: employeeEmail}));
    }
  }

  handlePageChanged(event) {
    this.paginationController.changePage(event.detail.page);
  }

  renderHeader() {
    this.paginationController.paginatedItems;
    return html`
      <div class="header">
        ${Object.keys(this.paginationController.paginatedItems[0]).map(
          (key) =>
            html`<div class="cell cell-header">${getTranslation(key)}</div>`
        )}
      </div>
    `;
  }

  renderBody() {
    return html`
      <div @click=${this.handleEmployeeClick} class="body">
        ${this.paginationController.paginatedItems.map(
          (employee) =>
            html`
              <div data-email=${employee.email} class="row">
                ${Object.values(employee).map(
                  (value) => html`<div class="cell">${value}</div>`
                )}
                <div class="cell delete">
                  <delete-employee id="${employee.email}"></delete-employee>
                </div>
              </div>
            `
        )}
      </div>
    `;
  }

  renderEmployeeRecords() {
    const classes = {
      wrapper: true,
      list: this.display,
      table: !this.display,
    };
    return html`
      <div class=${classMap(classes)}>
        ${this.renderHeader()} ${this.renderBody()}
      </div>
      <pagination-c
        currentPage="${this.paginationController.currentPage}"
        totalPages="${this.paginationController.totalPages}"
        @page-changed="${this.handlePageChanged}"
      ></pagination-c>
    `;
  }

  render() {
    return html` <h2>${getTranslation('employees')}</h2>
      <search-input></search-input>
      <button @click=${this.handleDisplay} class="primary">
        ${getTranslation('display')}
        ${this.display ? getTranslation('table') : getTranslation('list')}
      </button>
      <button @click=${() => store.dispatch(fetchMockData)} class="primary">
        ${getTranslation('getMock')}
      </button>
      ${this.renderWithLoadingEmpty(
        this.employees.isLoading,
        this.isEmptyData,
        () => this.renderEmployeeRecords()
      )}`;
  }
}

window.customElements.define('employee-records', EmployeeRecords);
