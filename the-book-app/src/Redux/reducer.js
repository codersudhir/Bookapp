import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from "./actiontypes";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  totalCount: 0,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS_LOADING:
      return { ...state, isLoading: true };
    case GET_BOOKS_ERROR:
      return { ...state, isLoading: false, isError: true };
    case GET_BOOKS:
      return {
        ...state,
        isLoading: false,
        products: payload.data,
        totalCount: payload.pagination.totalPages
      };
    default:
      return state;
  }
};

export { reducer };