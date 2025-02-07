import { Button, Card, Col, Input, List, Row } from "antd";
import dayjs from "dayjs";
import { BiEdit, BiSearchAlt } from "react-icons/bi";
import { Product } from "../../../../../types/product/product";
import { SystemConf } from "../../../../../types/system.conf/system.conf";
import { cookies } from "../../../../../controller/user/adm.cookies";
import { ChangeEvent, useState } from "react";

interface Props {
  valuesTable: Product[];
  loading: boolean;
  getRowValues: (values: Product) => any;
}

const systemConf: SystemConf = cookies.get("start.types.objects");

const unitMeasurement = systemConf.unitMeasurement;

export const StockRecordMobileList = (props: Props) => {
  const loading = props.loading;
  const [search, setSearch] = useState("");

  return (
    <Row justify={"center"} gutter={[0, 40]} className="m-0 mb-5">
      <Col span={24}>
        <Input
          type="text"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          suffix={<BiSearchAlt size={30} />}
          placeholder="Digite para pesquisar..."
        />
      </Col>

      <Col span={24}>
        <List
          pagination={{
            position: "bottom",
            pageSize: 3,
            showTotal: () => (
              <div className="text-black">
                <strong>Em Estoque: {props.valuesTable.length}</strong>
              </div>
            ),
          }}
          grid={{ gutter: 40, column: 1 }}
          loading={loading}
          dataSource={props.valuesTable.filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )}
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
                  <Col span={12}>Produto: {data.name}</Col>
                  <Col span={12}>
                    Valor:{" "}
                    {data.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Col>
                  <Col span={12}>
                    Tipo:{" "}
                    {
                      unitMeasurement.find(
                        (item) => item.name === data.unitMeasurement
                      )?.description
                    }
                  </Col>
                  <Col span={12}>Quantidade: {data.amount}</Col>
                  <Col span={12}>Ativo: {data.isActive ? "Sim" : "Não"}</Col>
                  <Col span={24}>
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
                          unitMeasurement: data.unitMeasurement,
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
