const initialState = {
  isLogin: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...initialState,
      };
    }
    case "LOGIN_FULFILLED": {
      return {
        ...initialState,
        isLogin: true,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...initialState,
        isLogin: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
