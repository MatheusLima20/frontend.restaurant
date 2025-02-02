import { Button, Col, Popconfirm, Row } from "antd";
import { SellOrderAddTableScreen } from "./sell.order.add.table.mobile";
import { MdTableBar } from "react-icons/md";
import { BiPowerOff } from "react-icons/bi";
import { cookies } from "../../../../../controller/user/adm.cookies";
import { UserType } from "../../../../../types/user/user";

const user = cookies.get("data.user");
const userType: UserType = user.userType;
const isWaiter = userType === "WAITER";

export const SellOrderScreenMobile = () => {
  const logout = () => {
    document.location = "/logout/";
  };

  return (
    <Row gutter={[0, 40]} justify={"center"}>
      {isWaiter && (
        <Col
          span={24}
          className="text-start"
          style={{ backgroundColor: "red", height: 50 }}
        >
          <Row justify={"space-between"} align={"middle"} className="m-1">
            <Col>
              <h2 className="mt-2 ms-3 ">
                <MdTableBar className="text-white " size={35} />{" "}
                <strong className="text-white ">Pedidos</strong>
              </h2>
            </Col>
            <Col>
              <Popconfirm
                title="Sair da Conta"
                placement="bottomLeft"
                description="Deseja realmente Sair?"
                onConfirm={logout}
                okText="Sim"
                cancelText="Não"
              >
                <Button type="primary" danger>
                  <BiPowerOff size={20} />
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </Col>
      )}

      <Col span={23} className="mt-5">
        <SellOrderAddTableScreen />
      </Col>
    </Row>
  );
};
