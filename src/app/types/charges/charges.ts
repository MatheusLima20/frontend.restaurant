
export type ChargesType = "WITHDRAWALBOXDAY" | "REINFORCEMENTBOXDAY" | "MONTHLYFEE";

export type ChargesPlatform = {
  name: string;
  clientInstallments: number;
  paymentToken: string;
};

export type Charges = {
  id: number;
  isPay: boolean;
  description: string;
  type: ChargesType
  payday: string;
  paidIn: string;
  value: number;
  payer: string;
  boxdayId: number;
};

