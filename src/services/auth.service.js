import axios from "axios";
import jwt_decode from "jwt-decode";
import APIConstants from "../constants/constants";


const API_URL = APIConstants.AUTHENTICATION_API_ROOT + "/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  try {
    let userData = JSON.parse(localStorage.getItem("user"));
    let token = userData["accessToken"];
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return [false, false];
    } else {
      let userType = userData["roles"];
      return [true, userType];
    }
  } catch (_) {
    return [false, false];
  }

};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
