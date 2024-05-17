import { AddressUser } from '../address/address';

export type UserType =
  | 'SUPER'
  | 'ADM'
  | 'CUSTOMER'
  | 'WAITER'
  | 'DELIVERYMAN'
  | '';

export type UserLogin = {
  email: string;
  password: string;
};

export type UserDataLogged = {
  name: string;
  userType: UserType;
  token: string;
  platformName: string;
};

export type UserClient = {
  id?: number;
  platformCPFCNPJ?: string;
  cpfcnpj: string;
  companyName: string;
  corporateName: string;
  userName: string;
  email: string;
  address: AddressUser;
  orderAverage?: number;
  password: string;
  passwordRepeated?: string;
  userType?: string | number;
  isActive: boolean;
};

export type UserMain = {
  id?: number;
  platformCPFCNPJ?: string;
  platformName: string;
  cpfcnpj: string;
  companyName: string;
  corporateName: string;
  userName: string;
  email: string;
  address: AddressUser;
  password: string;
  passwordRepeated?: string;
  userType?: string | number;
};

export type UserPhisicalPerson = {
  id?: number;
  cpf: string;
  cpfcnpj?: string;
  isActive?: boolean;
  password: string;
  passwordRepeated?: string;
  userName: string;
  email: string;
  address: AddressUser;
  userType: string;
};

export type UserProfile = {
  id: number;
  orderAverage: number;
};
