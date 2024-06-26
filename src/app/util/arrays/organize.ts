export const OrginizeArrays = {
  joinItemsOrders: (array: any[]) => {
    const newArray: any[] = [];
    array.map((data) => {
      let productName = '';
      let amount = 0;
      const hasData = newArray.filter(
        (value) => value.productName === data.productName,
      ).length;
      if (hasData === 0) {
        const newData = array.filter(
          (value) => value.productName === data.productName,
        );
        newData.map((data) => {
          productName = data.productName;
          amount += data.amount;
        });

        newArray.push({ ...data, productName, amount });
      }
    });
    return newArray;
  },
};
