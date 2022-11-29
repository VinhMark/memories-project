import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from '../constants/actionTypes';

var initialState = {
  posts: [],
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
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
