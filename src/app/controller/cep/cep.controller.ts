import axios from "../../config/axios";
import { Error } from "../errors/check.errors";

export const CepController = {
  get: async (cep: string) => {
    try {
      const request = await axios.get(`/search-cep/${cep}`);

      const data = request.data;

      const message = data.message;

      return { error: false, message, data: data.data };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },
};
