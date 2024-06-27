export type Order = {
  id: number;
  productId: number;
  productName: string;
  idTable: number;
  value: number;
  amount: number;
  isCancelled: boolean;
  isOpen: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};
