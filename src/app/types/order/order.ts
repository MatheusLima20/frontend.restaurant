import { ProductType } from '../product/product';

export type Order = {
  id: number;
  productId: number;
  productName: string;
  idTable: number;
  value: number;
  amount: number;
  isCancelled: boolean;
  productType: ProductType;
  isOpen: boolean;
  paymentMethod: string;
  status: OrderStatus;
  order: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = 'pendente' | 'processando' | 'finalizado';

export type PaymentMethod = 'debito' | 'dinheiro' | 'pix' | 'credito';
