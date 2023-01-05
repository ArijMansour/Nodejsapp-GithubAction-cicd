import Cookie from "js-cookie";
export default function authHeader(form) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      Authorization: `${Cookie.get("token")}`,
    };
  } else {
    return {};
  }
}

export function pictureHeader(form) {
  return { "Content-Type": `multipart/form-data; boundary=${form._boundary}` };
}
