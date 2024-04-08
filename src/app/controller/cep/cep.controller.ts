import axios from '../../config/axios';
import { Error } from '../errors/check.errors';

export const CepController = {
  get: async (cep: string) => {
    let request;
    let data;

    try {
      request = await axios.get(`/search-cep/${cep}`);

      data = request.data;

      const message = data.message;

      return { error: false, message, data: data.data };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },
};
