export type Order = {
  id: number;
  productId: number;
  productName: string;
  idTable: number;
  value: number;
  amount: number;
  isCancelled: boolean;
  isOpen: boolean;
  paymentMethod: string;
  status: OrderStatus;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = 'pendente' | 'processando' | 'finalizado';
