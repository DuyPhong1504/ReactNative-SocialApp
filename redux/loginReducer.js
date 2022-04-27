const initialState = {
  profile: {
    email: "",
    password: "",
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      const newUser = action.payload;
      return {
        ...state,
        profile: newUser,
      };
    case "LOGOUT":
      return {
        ...state,
        profile: {
          email: "",
          password: "",
        },
      };

    default:
      return state;
  }
};

export default loginReducer;
