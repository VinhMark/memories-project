const initialState = {
  authData: JSON.parse(localStorage.getItem('profile')) || null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
    case 'LOG_OUT':
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
