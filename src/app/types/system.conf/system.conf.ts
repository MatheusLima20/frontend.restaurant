import { UnitMeasurementObject } from "../unit.measurement/unit.measurement";
import { ProductTypeObject } from "../product/product";
import { UserTypeObject } from "../user/user";

export type SystemConf = {
  unitMeasurement: UnitMeasurementObject[];
  productType: ProductTypeObject[];
  userType: UserTypeObject[];
};
