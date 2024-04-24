export const StringFormatter = {
  onlyNumber: (value: string) => {
    const data = value.replace(/[^\d]+/g, '');
    return data;
  },
  realNumber: (value: number) => {
    const data = value.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });
    return ' R$ ' + data + ' ';
  },
};
