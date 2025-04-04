import axios from '../../config/axios';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

const cookie = cookies.get('data.user');

const token = cookie.token;

export const TableController = {
  store: async () => {
    let request;
    let data;

    try {
      request = await axios.post(
        '/table/',
        {},
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

  patch: async (id: number, isActive?: boolean, name?: string) => {
    try {
      const request = await axios.patch(
        `/table/${id}`,
        { isActive, name },
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

  get: async () => {
    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      const request = await axios.get('/tables/', {
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
