import {html} from 'lit';

export const LoadingEmptyMixin = (superclass) =>
  class extends superclass {
    emptyData() {
      return html`<h1>No data found</h1>`;
    }

    loading() {
      return html`<h1>Loading...</h1>`;
    }

    renderWithLoadingEmpty(isLoading, isEmptyData, renderContent) {
      return isLoading
        ? this.loading()
        : isEmptyData
        ? this.emptyData()
        : renderContent();
    }
  };
