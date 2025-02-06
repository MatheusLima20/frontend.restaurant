import { AxiosResponse } from "axios";
import axios from "../../config/axios";
import { Charges, ChargesPlatform, ChargesType } from "../../types/charges/charges";
import { Product } from "../../types/product/product";
import { Error } from "../errors/check.errors";
import { cookies } from "../user/adm.cookies";

const cookie = cookies.get("data.user");

const token = cookie.token;

export const ChargesController = {
  paymentPlatformCreditCard: async (charge: ChargesPlatform) => {
    let request: AxiosResponse<any, any>;
    let data: { message: any; data: any };

    try {
      request = await axios.post("/payment-platform-credit-card", charge, {
        headers: { authorization: `Bearer ${token}` },
      });

      data = request.data;

      const message = data.message;

      return { error: false, message, data: data.data };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },

  store: async (charge: Charges) => {
    let request: AxiosResponse<any, any>;
    let data: { message: any; data: any };

    try {
      request = await axios.post("/charges", charge, {
        headers: { authorization: `Bearer ${token}` },
      });

      data = request.data;

      const message = data.message;

      return { error: false, message, data: data.data };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },

  patch: async (id: number, dataUser: Product) => {
    const values = dataUser;

    try {
      const request = await axios.patch(`/product/${id}`, values, {
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

  get: async (type: ChargesType) => {
    try {
      const cookie = cookies.get("data.user");

      const token = cookie.token;

      const request = await axios.get(`/charges/${type}`, {
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
