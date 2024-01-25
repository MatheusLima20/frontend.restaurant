export const Masks = {
  cpf: (value: string) => {
    let mask = value.replace(/\D/g, '');

    mask = mask.replace(/(\d{3})(\d)/, '$1.$2');

    mask = mask.replace(/(\d{3})(\d)/, '$1.$2');

    mask = mask.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return mask;
  },

  cnpj: (value: string) => {
    let mask = value.replace(/\D/g, '');

    mask = mask.replace(/^(\d{2})(\d)/, '$1.$2');

    mask = mask.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');

    mask = mask.replace(/\.(\d{3})(\d)/, '.$1/$2');

    mask = mask.replace(/(\d{4})(\d)/, '$1-$2');

    return mask;
  },

  cep: (value: string) => {
    let mask = value.replace(/\D/g, '');

    mask = mask.replace(/^(\d{5})(\d)/, '$1-$2');

    return mask;
  },

  phone: (value: string) => {
    let mask = value.replace(/\D/g, '');

    mask = mask.replace(/^(\d\d)(\d)/g, '($1)$2');

    mask = mask.replace(/(\d{5})(\d)/, '$1-$2');

    return mask;
  },

  cpfcnpj: (value: string) => {
    if (value.length <= 15) {
      return Masks.cpf(value);
    }

    return Masks.cnpj(value);
  },
};
