import { createStore } from 'redux';

// Action types
const CHANGE_PAGE = 'CHANGE_PAGE';

// Action creator
export const changePage = (newPage) => ({
  type: CHANGE_PAGE,
  payload: newPage,
});

// Reducer
const initialState = {
  page: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

export default store;
