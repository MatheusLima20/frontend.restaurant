export type PlatformPlayments = {
  name: string;
  clientInstallments: number;
  paymentToken: string;
};

export type Charges = {
  id: number;
  isPay: boolean;
  description: string;
  payday: string;
  paidIn: string;
  value: number;
  payer: string;
};
