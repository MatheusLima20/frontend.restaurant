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
  sorterByHour: (a: any, b: any) => {
    const date1: string = a.createdAt.split(' ')[1];
    const date2: string = b.createdAt.split(' ')[1];

    const dateA = date1.replaceAll(':', '');

    const dateB = date2.replaceAll(':', '');

    const dateNumberA = Number.parseInt(dateA);
    const dateNumberB = Number.parseInt(dateB);
    const result = dateNumberA - dateNumberB;
    return result;
  },
};
