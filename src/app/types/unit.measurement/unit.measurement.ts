export type UnitMeasurementObject = {
  id: number;
  name: string;
  description: UnitDescription;
};

export type UnitDescription =
  | 'Kilo'
  | 'Litro'
  | 'Unidade'
  | 'Gramas'
  | 'Caixa'
  | 'Mililitros'
  | 'Pacote';
