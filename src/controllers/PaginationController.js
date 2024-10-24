import {store} from '../store';

export class PaginationController {
  constructor(host, items = [], rowsPerPage = 5) {
    this.host = host;
    this.host.addController(this);
    this.items = items;
    this.rowsPerPage = rowsPerPage;
    this.currentPage = 1;

    store.subscribe(() => this.handleStateChange(store.getState().search));
  }

  handleStateChange(searchTerm) {
    const search = searchTerm.toLowerCase();
    this.items = store.getState().employee.data.filter((employee) => {
      const joined = Object.values(employee).join(' ').toLowerCase();
      return joined.includes(search);
    });

    this.currentPage = 1;
    this.host.requestUpdate();
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.items.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.items.length / this.rowsPerPage);
  }

  changePage(page) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.host.requestUpdate();
    }
  }
}
