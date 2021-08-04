import axios from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axios.axiosApiIntances.post("login", data),
  };
};
