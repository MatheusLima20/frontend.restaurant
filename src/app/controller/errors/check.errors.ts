import { cookies } from '../user/adm.cookies';

export const Error = {
  check: async (error: any) => {
    const request = error;

    const data = request.response.data;
    if (!data) {
      const message = 'Erro: O servidor está em manutenção.';
      return message;
    }

    const message = data.message;

    if (message === 'Token Expirado.') {
      cookies.remove('data.user');
      setTimeout(() => {
        document.location = '/';
      }, 1000);
    }

    return message;
  },
};
