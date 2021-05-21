import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://reqres.in/api/";

const register = (username, password) => {
  return axios.post(API_URL + "register", {
    username,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (JSON.stringify(response.data) !== {}) {
        const customObject = {
          token: response.data.token,
          username: "Anand",
          // roles: ["ROLE_ADMIN"],
          // roles: ["ROLE_MODERATOR"],
          roles: ["ROLE_USER"],
          id: 123,
          email: "singh.ananddeep@gmail.com"
        }
        localStorage.setItem("user", JSON.stringify(customObject));
        return customObject;
      }
    })
    .catch(error => {
      return error.message
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
