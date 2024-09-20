export type Product = {
  id: number;

  name: string;

  platform: number;

  value: number;

  amount: number;

  unitMeasurement: string;

  productType: string;

  isActive: boolean;

  show: boolean;

  toCook: boolean;

  isPlate: false;

  add?: boolean;

  createdAt: string;

  updatedAt: string;
};

export type ProductTypeObject = {
  id: string;
  name: ProductType;
};

export type ProductType =
  | 'PRATO'
  | 'GUARNIÇÃO'
  | 'BEBIDA'
  | 'SOBREMESA'
  | 'PETISCO'
  | 'DRINK'
  | 'LUNCH';

export type RawMaterial = {
  id: number;
  productId: number;
  rawMaterialId: number;
  amount: number;
};

export type Profit = {
  productName: string;
  productType: string;
  totalRawMaterial: number;
  productValue: number;
  profit: number;
};
