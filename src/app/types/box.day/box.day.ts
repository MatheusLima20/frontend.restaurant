export type BoxDay = {
  id: number;
  isOpen: boolean;
  startValue: number;
  grandTotal?: number;
  totalWithdrawals?: number;
  totalReinforcement?: number;
  createdBy: string;
  createdAt: string;
  totalBoxDay: number;
};
