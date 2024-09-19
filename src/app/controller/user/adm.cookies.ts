import { getCookie, removeCookie, setCookie } from "react-use-cookie";

export type Key =
  | "data.user"
  | "accept.cookies"
  | "primary.access"
  | "start.types.objects";

export const cookies = {
  store: (value: any, key: Key) => {
    const toJSONValue = JSON.stringify(value);

    setCookie(key, toJSONValue, {
      days: 30,
      SameSite: "Lax",
    });
  },

  get: (key: Key) => {
    const values = getCookie(key);
    const JSONValue = values ? JSON.parse(values) : "";
    return JSONValue;
  },

  remove: (key: Key) => {
    removeCookie(key);
  },

  removeAll: () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      removeCookie(name);
    }
  },
};
