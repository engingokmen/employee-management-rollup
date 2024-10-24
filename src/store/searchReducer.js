export const search = (state = '', action) => {
  switch (action.type) {
    case 'search':
      return action.payload;
    default:
      return state;
  }
};

// ACTION CREATORS

export const searchTerm = (term) => {
  return {type: 'search', payload: term};
};
