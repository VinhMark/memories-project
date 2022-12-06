import {
  CLEAR_POST,
  COMMENT,
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LIKE,
  START_LOADING,
  UPDATE,
} from '../constants/actionTypes';

var initialState = {
  posts: [],
  post: null,
  numberPage: 1,
  numberOfPage: 1,
  isLoading: false,
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CLEAR_POST:
      return { ...state, post: null };
    case FETCH_ALL:
      const { data, numberPage, numberOfPage } = action.payload;
      return { ...state, posts: data, numberPage, numberOfPage };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case CREATE:
      state.posts.pop();
      return { ...state, posts: [action.payload, ...state.posts] };
    case UPDATE:
    case LIKE:
      let newState = { ...state };
      const index = newState.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index === -1) return state;
      newState.posts[index] = action.payload;
      return newState;
    case DELETE: {
      let removeState = { ...state };
      removeState.posts = removeState.posts.filter(
        (post) => post._id !== action.payload
      );
      console.log('delete', removeState);
      return { ...state, posts: removeState.posts };
    }
    default:
      return state;
  }
};

export default postReducer;
