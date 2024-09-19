import { ProductTypeObject } from "../../types/product/product";
import { SystemConf } from "../../types/system.conf/system.conf";
import { UnitMeasurementObject } from "../../types/unit.measurement/unit.measurement";
import { UserTypeObject } from "../../types/user/user";
import { ProductTypesController } from "../product.types/product.types.controller";
import { UnitMeasurementController } from "../unit.measurement/unit.measurement.controller";
import { UserTypeController } from "../user.type/user.type.controller";
import { cookies } from "../user/adm.cookies";

export const StartConfController = {
  startTypesObjects: async () => {
    const requestUnit = await UnitMeasurementController.get();

    const requestProductType = await ProductTypesController.get();

    const requestUserType = await UserTypeController.getTypes();

    const dataUnit: UnitMeasurementObject[] = requestUnit.data;

    const dataProductType: ProductTypeObject[] = requestProductType.data;

    const dataUserType: UserTypeObject[] = requestUserType.data;

    if (dataUnit && dataProductType) {
      cookies.store(
        {
          unitMeasurement: dataUnit,
          productType: dataProductType,
          userType: dataUserType,
        } as SystemConf,
        "start.types.objects"
      );
    }
  },
};
