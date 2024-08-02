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
  replaceSpecialChars: (value: string) => {
    value = value.replace(/[ÀÁÂÃÄÅ]/, 'A');
    value = value.replace(/[àáâãäå]/, 'a');
    value = value.replace(/[ÈÉÊË]/, 'E');
    value = value.replace(/[Ç]/, 'C');
    value = value.replace(/[ç]/, 'c');

    return value.replace(/[^a-z0-9]/gi, '');
  },
};
