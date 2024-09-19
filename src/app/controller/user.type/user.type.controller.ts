import axios from "../../config/axios";
import { Error } from "../errors/check.errors";

export const UserTypeController = {
  getTypes: async () => {
    try {
      const request = await axios.get("/user-type");

      const data = request.data;

      const message = data.message;

      return { error: false, message, data: data.data };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },
};
