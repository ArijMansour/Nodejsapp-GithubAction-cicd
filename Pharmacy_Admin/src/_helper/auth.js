import cookie from "js-cookie";

// Set in Cookie
export const setCookie = (key, value) => {
  if (window !== "undefiend") {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response.data);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};

export const saveFiles = (files) => {
  localStorage.setItem("mutliple_resources", files);

  //...
};

export const getFiles = () => {
  const getFiles = localStorage.getItem("mutliple_resources");
  return getFiles;
};
export const removeFiles = () => {
  localStorage.removeItem("mutliple_resources");
};
