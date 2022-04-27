const initialState = {
  item: {
    name: "",
    image: "",
    date: "",
  },
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
      };
    case "ADD":
      return {
        ...state,
      };
    case "REMOVE": {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default loginReducer;
