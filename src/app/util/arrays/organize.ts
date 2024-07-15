import dayjs from 'dayjs';

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
    const formattedDate1 = dayjs(a.createdAt).format('YYYY-MM-DD hh:mm:ss');
    const formattedDate2 = dayjs(b.createdAt).format('YYYY-MM-DD hh:mm:ss');

    const date1: string = formattedDate1.replaceAll('-', '');
    const date2: string = formattedDate2.replaceAll('-', '');

    const dateA = date1.replaceAll(':', '').replaceAll(' ', '');

    const dateB = date2.replaceAll(':', '').replaceAll(' ', '');

    const dateNumberA = Number.parseInt(dateA);
    const dateNumberB = Number.parseInt(dateB);
    const result = dateNumberA - dateNumberB;
    return result;
  },

  groupBy: (oldArray: any[], key: any) => {
    let newArray: any[] = [];

    oldArray.map((data) => {
      let hasData: any[] = [];

      if (newArray.length) {
        hasData = newArray.filter((value) => value[key] === data[key]);
      }

      if (!hasData.length) {
        const array = oldArray.filter((item) => item[key] === data[key]);
        newArray = newArray.concat(array);
      }
    });

    return newArray;
  },
};
