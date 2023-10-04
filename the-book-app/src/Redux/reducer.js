export const GET_BOOKS = 'books/get_books';
export const GET_BOOKS_LOADING = 'books/get_Books_loading';
export const GET_BOOKS_ERROR = 'books/get_books_error';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  totalCount: 0,
};
const Reducer = (state = initialState, action) => {
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

export { Reducer };