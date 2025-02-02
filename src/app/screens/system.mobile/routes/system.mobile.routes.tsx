import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { cookies } from "../../../controller/user/adm.cookies";
import { UserType } from "../../../types/user/user";
import { HeaderMobile } from "../includes/header";
import { KitchenMobile } from "../screens/kitchen";
import { BoxDayMobile } from "../screens/register/box.day";
import { SellOrderMobile } from "../screens/sells/orders";

const user = cookies.get("data.user");

export const SystemMobileRoutes = () => {
  return userRoutes();

  function userRoutes() {
    const userType: UserType = user.userType;

    if (userType === "SUPER" || userType === "ADM") {
      return (
        <Layout style={{ backgroundColor: "#d3d3d3" }}>
          <Layout.Header className="w-100"  style={{ backgroundColor: "#d3d3d3" }}>
            <HeaderMobile />
          </Layout.Header>
          <Layout.Content style={{ height: "100%", width: "100%" }}>
            <Routes>
              <Route index path="/*" element={BoxDayMobile()} />
              <Route index path="/box-day" element={BoxDayMobile()} />
              <Route index path="/order" element={SellOrderMobile()} />
            </Routes>
          </Layout.Content>
        </Layout>
      );
    }

    if (userType === "COOK") {
      return (
        <Layout style={{ backgroundColor: "#d3d3d3" }}>
          <Layout.Content>
            <Routes>
              <Route index path="*" element={KitchenMobile()} />
            </Routes>
          </Layout.Content>
        </Layout>
      );
    }

    return (
      <Layout style={{ backgroundColor: "#d3d3d3" }}>
        <Layout.Content>
          <Routes>
            <Route index path="*" element={SellOrderMobile()} />
          </Routes>
        </Layout.Content>
      </Layout>
    );
  }
};
