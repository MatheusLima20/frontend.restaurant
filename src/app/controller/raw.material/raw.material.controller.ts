import axios from '../../config/axios';
import { RawMaterial } from '../../types/product/product';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';

const cookie = cookies.get('data.user');

const token = cookie.token;

export const RawMaterialController = {
  store: async (rawMaterial: RawMaterial) => {
    let request;
    let data;

    const values = {
      productId: rawMaterial.productId,
      rawMaterialId: rawMaterial.rawMaterialId,
      amount: rawMaterial.amount,
    };

    try {
      request = await axios.post(
        '/raw-material/',
        { ...values },
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

  patch: async (id: number, rawMaterial: RawMaterial) => {
    const values = {
      productId: rawMaterial.productId,
      rawMaterialId: rawMaterial.rawMaterialId,
      amount: rawMaterial.amount,
    };

    try {
      const request = await axios.patch(
        `/raw-material/${id}`,
        { ...values },
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

  getById: async (id: number) => {
    try {
      const cookie = cookies.get('data.user');

      const token = cookie.token;

      const request = await axios.get(`/raw-material/${id}`, {
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
