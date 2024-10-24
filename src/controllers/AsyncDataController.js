import {store} from '../store';

export class AsyncDataController {
  constructor(host, asyncFunction) {
    this.host = host;
    this.host.addController(this);
    this.data = store.getState().employee.data;
    this.isLoading = true;

    store.subscribe(() => this.handleStateChange(store.getState()));
    store.dispatch(asyncFunction);
  }

  handleStateChange(state) {
    this.data = [...state.employee.data];
    this.host.requestUpdate();
  }
}
