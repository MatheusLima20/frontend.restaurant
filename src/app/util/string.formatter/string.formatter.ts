export const StringFormatter = {
  OnlyNumber: (value: string) => {
    const data = value.replace(/[^\d]+/g, '');
    return data;
  },
};
