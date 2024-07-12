import axios from '../../config/axios';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

export const UnitMeasurementController = {
  get: async () => {
    let request;
    let data;

    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      request = await axios.get(`/unit-measurement`, {
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
