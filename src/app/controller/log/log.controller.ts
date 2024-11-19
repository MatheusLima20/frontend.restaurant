import axios from "../../config/axios";
import { Error } from "../errors/check.errors";
import { cookies } from "../user/adm.cookies";

const cookie = cookies.get("data.user");

const token = cookie.token;

export const LogController = {
  get: async (date: string) => {
    try {
      const request = await axios.get(`/log/${date}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = request.data;

      const message = data.message;

      return { error: false, message, data: data.data };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },
};
