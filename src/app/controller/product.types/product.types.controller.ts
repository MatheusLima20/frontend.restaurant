import axios from '../../config/axios';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

export const ProductTypesController = {
  get: async () => {
    let request: any;
    let data: any;

    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      request = await axios.get(`/product-type`, {
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
};
