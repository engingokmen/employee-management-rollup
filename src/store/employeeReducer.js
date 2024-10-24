// iniitializes data from local storage
const data = localStorage.getItem("employees");
let initialData = [];
if (data && data !== "undefined") {
  initialData = JSON.parse(data);
}

export const employee = (
  state = {
    data: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case "loading":
      return { data: state.data, loading: true };
    case "loaded":
      return { data: action.payload, loading: false };
    case "addedEmployee":
      return { data: [...state.data, action.payload], loading: false };
    case "updatedEmployee":
      return {
        data: state.data.map((employee) =>
          employee.email === action.payload.email ? action.payload : employee
        ),
        loading: false,
      };
    case "deletedEmployee":
      return {
        data: state.data.filter(
          (employee) => employee.email !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

// ACTION CREATORS

export const fetchEmployees = (dispatch) => {
  dispatch({ type: "loading" });
  // TODO replace with local storage fetch
  const data = localStorage.getItem("employees");
  let employees = [];
  if (data && data !== "undefined") {
    employees = JSON.parse(data);
  }
  dispatch({ type: "loaded", payload: employees });
};

export const addEmployee = (employee) => (dispatch, getState) => {
  dispatch({ type: "addedEmployee", payload: employee });
  localStorage.setItem("employees", JSON.stringify(getState().employee.data));
};

export const updateEmployee = (employee) => (dispatch, getState) => {
  dispatch({ type: "updatedEmployee", payload: employee });
  localStorage.setItem("employees", JSON.stringify(getState().employee.data));
};

export const deleteEmployee = (id) => (dispatch, getState) => {
  dispatch({ type: "deletedEmployee", payload: id });
  localStorage.setItem("employees", JSON.stringify(getState().employee.data));
};
