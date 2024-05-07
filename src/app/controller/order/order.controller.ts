import axios from '../../config/axios';
import { Order } from '../../types/order/order';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

const cookie = cookies.get('data.user');

const token = cookie.token;

export const OrderController = {
  store: async (product: Order) => {
    let request;
    let data;

    try {
      request = await axios.post(
        `/order/`,
        { ...product },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      data = request.data;

      const message = data.message;

      return { error: false, message };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },

  patch: async (id: number, order: Order) => {
    const values = order;

    try {
      const request = await axios.patch(`/order/${id}`, values, {
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
  patchTableOrders: async (idTable1: number, idTable2: number) => {
    try {
      const request = await axios.patch(
        `/order/${idTable1}/${idTable2}`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      const data = request.data;

      const message = data.message;

      return { error: false, message };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },

  getByTable: async (id: number) => {
    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      const request = await axios.get(`/order/${id}`, {
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
