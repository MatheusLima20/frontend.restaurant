import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { Product } from "../../../../../types/product/product";
import { BsBox2Fill } from "react-icons/bs";
import { Spending } from "../../../../../types/spending/spending";
import { SpendingController } from "../../../../../controller/spending/spending.controller";
import { TranslateController } from "../../../../../controller/translate/translate.controller";
import { SpendingRegisterTable } from "./spending.register.table";
import dayjs from "dayjs";
import { SystemConf } from "../../../../../types/system.conf/system.conf";
import { cookies } from "../../../../../controller/user/adm.cookies";
import { ResponseError } from "../../../../../types/axios/response.error";

const initialValues = {
  id: 0,
  name: "",
  value: 0,
  isActive: true,
  unitMeasurement: "KG",
  show: true,
  amount: 0,
};

const systemConf: SystemConf = cookies.get("start.types.objects");

const unitMeasurement = systemConf.unitMeasurement;

export const SpendingRegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const [valuesTable, setValuesTable] = useState([]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const clearValues = () => {
    setValues(initialValues);
  };

  useEffect(() => {
    getSpending();
  }, []);

  return (
    <Row className="mt-5" gutter={[0, 30]}>
      {contextHolder}
      <Col span={20} className="text-center">
        <h2>
          <strong>Controle de Gastos</strong>
        </h2>
      </Col>

      <Col span={20}>
        <Form
          name="basic"
          autoComplete="on"
          fields={[
            {
              name: "name",
              value: values.name,
            },
            {
              name: "value",
              value: values.value,
            },
            {
              name: "amount",
              value: values.amount,
            },
            {
              name: "unitMeasurement",
              value: values.unitMeasurement,
            },
            {
              name: "show",
              value: values.show,
            },
            {
              name: "isActive",
              value: values.isActive,
            },
          ]}
          onFinish={save}
        >
          <Row justify={"center"}>
            <Col span={24}>
              <Row gutter={[10, 10]}>
                <Col md={7}>
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      { required: true, message: "Digite o nome do produto!" },
                    ]}
                  >
                    <Input
                      name="name"
                      placeholder="Digite o nome..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>

                <Col md={5}>
                  <Form.Item
                    label="Valor"
                    name="value"
                    rules={[
                      {
                        required: true,
                        message: "Digite o valor!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="value"
                      onChange={handleChange}
                      value={values.value}
                      prefix={<span>R$</span>}
                    />
                  </Form.Item>
                </Col>

                <Col md={5}>
                  <Form.Item
                    label="Quantidade"
                    name="amount"
                    rules={[
                      {
                        required: false,
                        message: "Digite a quantidade!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="amount"
                      onChange={handleChange}
                      value={values.amount}
                      prefix={<BsBox2Fill />}
                    />
                  </Form.Item>
                </Col>

                <Col md={6}>
                  <Form.Item label="Unidade" name="unitMeasurement">
                    <Select
                      onChange={(value: string) => {
                        const event: any = {
                          target: {
                            name: "unitMeasurement",
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      value={values.unitMeasurement}
                      options={unitMeasurement.map((value) => {
                        return { value: value.name, label: value.description };
                      })}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item>
            <Row justify={"center"} gutter={[20, 0]} className="mt-2">
              <Col>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Col>
              <Col>
                <Button type="default" onClick={clearValues}>
                  Limpar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>

      <Col span={20} className="text-center">
        <DatePicker
          defaultValue={dayjs()}
          format={"MM/YYYY"}
          picker="month"
          onChange={(value) => {
            getSpending(value);
          }}
        />
      </Col>

      <Col span={24}>
        <SpendingRegisterTable
          loading={loading}
          getRowValues={(editValues: Product) => {
            setValues(editValues);
          }}
          valuesTable={valuesTable}
        />
      </Col>
    </Row>
  );

  async function save(valuesForm: Product) {
    setLoading(true);

    messageApi.open({
      key: "register.spending",
      type: "loading",
      content: "Enviando...",
      duration: 4,
    });

    const spending: Spending = {
      ...valuesForm,
      name: valuesForm.name,
      amount: valuesForm.amount,
      value: valuesForm.value,
      unitMeasurement: valuesForm.unitMeasurement,
    };

    const id: number = values.id;

    let request: ResponseError;

    if (id == 0) {
      request = await SpendingController.store(spending);
    } else {
      request = await SpendingController.patch(id, { ...spending });
    }

    const error = request.error;

    const message = request.message;

    const type = error ? "error" : "success";

    const tranlateMessage = await TranslateController.get(message);

    setTimeout(() => {
      messageApi.open({
        key: "register.spending",
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      setLoading(false);
      if (!error) {
        clearValues();
      }
    }, 1000);
    await getSpending();
  }

  async function getSpending(date?: any) {
    const search = date
      ? dayjs(date).format("YYYY-MM")
      : dayjs().format("YYYY-MM");

    setLoading(true);

    const request = await SpendingController.get(search);

    const error = request.error;

    if (!error) {
      const data = request.data.spending;

      if (data) {
        setValuesTable(data);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
};
