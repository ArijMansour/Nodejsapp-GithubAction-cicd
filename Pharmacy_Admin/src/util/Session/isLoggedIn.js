export const isLoggedIn = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const signout = (next) => {
  // removeCookie("token");
  removeLocalStorage("user");
  //  next();
};

export const saveEmail = (email) => {
  localStorage.setItem("email", email);
};
export const saveAvatar = (avatar) => {
  if (avatar) return localStorage.setItem("avatar", avatar);
  else return false;
};

export const getAvatar = () => {
  if (window !== "undefined") {
    localStorage.getItem("avatar");
  } else return false;
};

export const saveToken = (key, token) => {
  localStorage.setItem(key, token);
};
export const getSavedToken = () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }
  return false;
};

export const getSavedEmail = () => {
  if (localStorage.getItem("email")) {
    return localStorage.getItem("email");
  }
  return false;
};

export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
