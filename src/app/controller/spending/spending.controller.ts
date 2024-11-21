import axios from "../../config/axios";
import { Spending } from "../../types/spending/spending";
import { Error } from "../errors/check.errors";
import { cookies } from "../user/adm.cookies";

const cookie = cookies.get("data.user");

const token = cookie.token;

export const SpendingController = {
  store: async (spending: Spending) => {
    let request;
    let data;

    try {
      request = await axios.post("/spending/", spending, {
        headers: { authorization: `Bearer ${token}` },
      });

      data = request.data;

      const message = data.message;

      return { error: false, message };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },

  patch: async (id: number, spending: Spending) => {
    const values = spending;

    try {
      const request = await axios.patch(`/spending/${id}`, values, {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = request.data;

      const message = data.message;

      return { error: false, message };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },

  get: async (date: string) => {
    try {
      const cookie = cookies.get("data.user");

      const token = cookie.token;

      const request = await axios.get(`/spending/${date}`, {
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
