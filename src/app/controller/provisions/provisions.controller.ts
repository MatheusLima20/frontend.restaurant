import axios from '../../config/axios';
import { Product } from '../../types/product/product';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

const cookie = cookies.get('data.user');

const token = cookie.token;

export const ProvisionsController = {
  store: async (product: Product) => {
    let request;
    let data;

    try {
      request = await axios.post('/product/', product, {
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

  get: async (isproduct: boolean) => {
    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      const request = await axios.get(`/product/${isproduct}`, {
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

  getPlates: async () => {
    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      const request = await axios.get('/plates', {
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
