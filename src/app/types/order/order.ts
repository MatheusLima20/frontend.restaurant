export type Order = {
  id: number;
  idProduct: number;
  productName: string;
  idTable: number;
  value: number;
  isCancelled: boolean;
  isOpen: boolean;
  createdBy: number;
  updatedBy: number;
};
