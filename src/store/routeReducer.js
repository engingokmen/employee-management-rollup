const initialState = {
  location: { path: "employees", params: {} },
  routes: ["employees", "addEmployee"],
};

export const route = (state = initialState, action) => {
  switch (action.type) {
    case "routed":
      return { location: { ...action.payload } };
    default:
      return state;
  }
};

// ACTION CREATORS

export const routeTo = ({ path, params }) => {
  return { type: "routed", payload: { path, params: params ? params : {} } };
};

export const toEmployeesPage = () => routeTo({ path: "employees" });
export const toAddEditEmployeePage = (params = {}) =>
  routeTo({ path: "addEditEmployee", params });
