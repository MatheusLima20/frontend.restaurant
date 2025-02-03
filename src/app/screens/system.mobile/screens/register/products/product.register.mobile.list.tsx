import { Button, Card, Col, List, Row } from "antd";
import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import { Product } from "../../../../../types/product/product";

interface Props {
  valuesTable: Product[];
  loading: boolean;
  getRowValues: (values: Product) => any;
}

export const ProductMobileRegisterList = (props: Props) => {
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
                <strong>Produtos: {props.valuesTable.length}</strong>
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
                      <strong>Produto: {data.id}</strong>
                    </Col>
                  </Row>
                }
              >
                <Row
                  justify={"space-between"}
                  gutter={[40, 40]}
                  className="text-center"
                >
                  <Col>Produto: {data.name}</Col>
                  <Col>
                    Valor:{" "}
                    {data.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Col>
                  <Col>Tipo: {data.productType}</Col>
                  <Col>Exibir: {data.show ? "Sim" : "Não"}</Col>
                  <Col>Para a Cozinha: {data.show ? "Sim" : "Não"}</Col>
                  <Col>
                    Criado em:{" "}
                    {dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </Col>
                  <Col span={24}>
                    <Button
                      onClick={() => {
                        props.getRowValues({
                          id: data.id,
                          name: data.name,
                          value: data.value,
                          amount: data.amount,
                          isActive: data.isActive,
                          show: data.show,
                          productType: data.productType,
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
