import { Button, Col, Drawer, Flex, Popconfirm, Row, Space } from "antd";
import { useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { GiHotMeal, GiTakeMyMoney } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "./menu.css";

const items = [
  { Icon: FaBoxOpen, label: "Caixa", location: "/*" },
  { Icon: GiHotMeal, label: "Pedidos", location: "/order" },
  { Icon: GiTakeMyMoney, label: "Lucro", location: "*" },
  { Icon: GiHotMeal, label: "Pedidos", location: "*" },
];

export const MenuMobileScreen = () => {
  const [open, setOpen] = useState<boolean>(false);

  const logout = () => {
    document.location = "/logout/";
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  return (
    <Row>
      <Col>
        <Button onClick={showDrawer}>
          <TiThMenu size={30} />
        </Button>
        <Drawer
          title="Menu"
          placement={"left"}
          width={500}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
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
            </Space>
          }
        >
          <Flex vertical gap="small" style={{ width: "100%" }}>
            {items.map((value, index) => {
              const id = String(index + 1);
              const label = value.label;
              return (
                <Button
                  key={id}
                  type="default"
                  onClick={() => {
                    onClose();
                    navigate(value.location);
                  }}
                >
                  <value.Icon size={20} /> {label}
                </Button>
              );
            })}
          </Flex>
        </Drawer>
      </Col>
    </Row>
  );
};
