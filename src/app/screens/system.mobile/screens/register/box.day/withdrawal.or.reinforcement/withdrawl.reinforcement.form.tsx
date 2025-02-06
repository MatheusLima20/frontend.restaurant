import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { ChargesController } from "../../../../../../controller/charges/charges.controller";
import { Charges, ChargesType } from "../../../../../../types/charges/charges";
import { TranslateController } from "../../../../../../controller/translate/translate.controller";
import { NoticeType } from "antd/es/message/interface";

type Message = {
  text: string;
  type: NoticeType;
};

interface Props {
  id: number;
  type: ChargesType,
  title: string,
  onSave: (values: Message) => void;
}

const initialValues = {
  description: "",
  value: 0,
};

export const WithdrawalFormMobile = (props: Props) => {
  const boxdayId = props.id;

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Row gutter={[20, 30]} justify={"center"}>
      <Col>
        <h2>
          <strong>{props.title}</strong>
        </h2>
      </Col>
      <Col span={24}>
        <Form
          name="form.withdrawal.mobile"
          layout="vertical"
          autoComplete="on"
          fields={[
            { name: "description", value: values.description },
            { name: "value", value: values.value },
          ]}
          onFinish={save}
        >
          <Row justify={"center"}>
            <Col span={20}>
              <Form.Item
                label="Descrição"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Por valor, digite a descrição.",
                  },
                ]}
              >
                <Input
                  name="description"
                  placeholder="Informe a descrição..."
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Valor"
                name="value"
                rules={[
                  {
                    required: true,
                    message: "Por valor, digite o valor.",
                  },
                ]}
              >
                <Input
                  name="value"
                  type="number"
                  placeholder="Informe o valor incial..."
                  prefix="R$"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Row justify={"center"} gutter={[20, 0]} className="mt-2">
                  <Col>
                    <Button loading={loading} type="primary" htmlType="submit">
                      Salvar
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="default"
                      loading={loading}
                      onClick={() => {
                        setValues(initialValues);
                      }}
                    >
                      Limpar
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );

  async function save() {
    setLoading(true);
    const data: Charges = {
      ...values,
      description: values.description,
      value: values.value,
      boxdayId: boxdayId,
      isPay: true,
      type: props.type,
    } as Charges;

    const request = await ChargesController.store(data);

    const error = request.error;

    const message = request.message;

    const type = error ? "error" : "success";

    const tranlateMessage = await TranslateController.get(message);

    setTimeout(() => {
      if (!error) {
        setValues(initialValues);
      }
      props.onSave({ text: tranlateMessage.text, type: type });
      setLoading(false);
    }, 1000);
  }
};
