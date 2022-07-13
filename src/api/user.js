import axios from "axios";

const API = axios.create({ baseURL: process.env?.REACT_APP_HERO_USER });

const user = JSON.parse(localStorage.getItem("user"));

API.interceptors.request.use((req) => {
  if (user) {
    req.headers.auhtorization = `Bearer ${user.token}`;
  }
  return req;
});

const signUp = async (userData) => {
  const res = await API.post("/signup", userData).catch((err) =>
    console.log(err)
  );
  res.data && localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const signIn = async (userData) => {
  const res = await API.post("/signin", userData).catch((err) =>
    console.log(err)
  );
  res.data && localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const googleLogin = (userData) => {
  userData && localStorage.setItem("user", JSON.stringify(userData));
  return JSON.parse(localStorage.getItem("user"));
};

const Auth = { signIn, signUp, googleLogin };

export default Auth;
