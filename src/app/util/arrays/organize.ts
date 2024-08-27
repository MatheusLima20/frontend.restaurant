import dayjs from 'dayjs';
import { Order, OrderKey } from '../../types/order/order';
import { Spending } from '../../types/spending/spending';

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
  joinItemsSpending: (array: Spending[]) => {
    const newArray: any[] = [];
    array.map((data) => {
      let name = '';
      let amount = 0;
      const hasData = newArray.filter(
        (value) => value.name === data.name,
      ).length;
      if (hasData === 0) {
        const newData = array.filter((value) => value.name === data.name);
        newData.map((data) => {
          name = data.name;
          amount += data.amount;
        });

        newArray.push({ ...data, name: name, amount });
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
  ordersByAmount: (values: Order[], key: OrderKey) => {
    if (!values.length) {
      return [];
    }
    const newValues: Order[] = [];

    const labels: any[] = [];

    values.filter((value) => {
      const exists = labels.includes(value[key]);

      if (!exists) {
        labels.push(value.productName);
      }
    });

    labels.map((label) => {
      let valueFilter: Order;
      let totalAmount = 0;
      values.filter((value) => {
        if (value[key] === label) {
          totalAmount += value.amount;
          valueFilter = { ...value, amount: totalAmount };
        }
      });
      newValues.push(valueFilter);
      return;
    });
    return newValues;
  },
};
