import {
  Button,
  Card,
  Col,
  List,
  Row
} from "antd";
import { BiEdit } from "react-icons/bi";
import { TranslateController } from "../../../../../controller/translate/translate.controller";
import { UserClient } from "../../../../../types/user/user";

interface Props {
  valuesTable: UserClient[];
  loading: boolean;
  getRowValues: (values: UserClient) => any;
}

export const UsersMobileList = (props: Props) => {
  const loading = props.loading;


  return (
    <Row className="m-0 mb-5 justify-content-center">
      <Col span={24}>
        <List
          pagination={{
            position: "bottom",
            pageSize: 3,
            showTotal: () => (
              <div className="text-black">
                <strong>Usuários: {props.valuesTable.length}</strong>
              </div>
            ),
          }}
          grid={{ gutter: 40, column: 1 }}
          loading={loading}
          dataSource={props.valuesTable}
          renderItem={(data) => (
            <List.Item>
              <Card
                title={
                  <Row className="text-center">
                    <Col span={24} className="fs-6">
                      <strong>Usuário: {data.id}</strong>
                    </Col>
                  </Row>
                }
              >
                <Row
                  justify={"space-between"}
                  gutter={[40, 40]}
                  className="text-center"
                >
                  <Col span={24}>Nome: {data.userName}</Col>
                  <Col span={24}>Email: {data.email}</Col>
                  <Col span={24}>
                    Função:{" "}
                    {TranslateController.getNoAsync(
                      data.userType
                    ).text.toUpperCase()}
                  </Col>
                  <Col span={24}>Ativo: {data.isActive ? "Sim" : "Não"}</Col>
                  <Col span={24}>
                    <Button
                      onClick={() => {
                        props.getRowValues({
                          id: data.id,
                          userName: data.userName,
                          email: data.email,
                          userType: data.userType,
                          isActive: data.isActive,
                          ...(data as any),
                        });
                      }}
                    >
                      <BiEdit size={20} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );

};
