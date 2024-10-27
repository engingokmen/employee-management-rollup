import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import {
  employee,
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employeeReducer";
import { search, searchTerm } from "./searchReducer";
import { route, toEmployeesPage, toAddEditEmployeePage } from "./routeReducer";

const composedEnhancer = compose(applyMiddleware(thunk));

function rootReducer(state = {}, action) {
  return {
    employee: employee(state.employee, action),
    search: search(state.search, action),
    route: route(state.route, action),
  };
}

export const store = createStore(rootReducer, composedEnhancer);

export {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  searchTerm,
  toEmployeesPage,
  toAddEditEmployeePage,
};
