import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Switch, message } from 'antd';
import { Product } from '../../../../types/product/product';
import { ProductController } from '../../../../controller/product/products.controller';
import { BsBox2Fill } from 'react-icons/bs';
import { Spending } from '../../../../types/spending/spending';
import { SpendingController } from '../../../../controller/spending/spending.controller';
import { TranslateController } from '../../../../controller/translate/translate.controller';

const initialValues = {
  name: '',
  value: 0,
  isActive: true,
  unitMeasurement: 'KG',
  show: true,
  amount: 0,
};

export const ProductRegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Row className="mt-5" gutter={[0, 30]}>
      {contextHolder}
      <Col>
        <h2>
          <strong>Cadastro de produtos</strong>
        </h2>
      </Col>

      <Col span={20}>
        <Form
          name="basic"
          autoComplete="on"
          fields={[
            {
              name: 'name',
              value: values.name,
            },
            {
              name: 'value',
              value: values.value,
            },
            {
              name: 'amount',
              value: values.amount,
            },
            {
              name: 'unitMeasurement',
              value: values.unitMeasurement,
            },
            {
              name: 'show',
              value: values.show,
            },
            {
              name: 'isActive',
              value: values.isActive,
            },
          ]}
          onFinish={save}
        >
          <Row justify={'center'}>
            <Col>
              <Row gutter={[10, 10]}>
                <Col md={7}>
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      { required: true, message: 'Digite o nome do produto!' },
                    ]}
                  >
                    <Input name="name" onChange={handleChange} />
                  </Form.Item>
                </Col>

                <Col md={5}>
                  <Form.Item
                    label="Valor"
                    name="value"
                    rules={[
                      {
                        required: true,
                        message: 'Digite o valor!',
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

                <Col md={6}>
                  <Form.Item
                    label="Quantidade"
                    name="amount"
                    rules={[
                      {
                        required: false,
                        message: 'Digite a quantidade!',
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
                      defaultValue="KG"
                      onChange={(value: string) => {
                        const event: any = {
                          target: {
                            name: 'unitMeasurement',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      value={values.unitMeasurement}
                      options={[
                        { value: 'CX', label: 'Caixa' },
                        { value: 'g', label: 'Grama' },
                        { value: 'L', label: 'Litro' },
                        { value: 'ml', label: 'Mililitro (ml)' },
                        { value: 'PC', label: 'Pacote' },
                        { value: 'KG', label: 'Quilo' },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col md={8}>
              <Row justify={'space-between'}>
                <Col>
                  <Form.Item label="Ativo" name="isActive">
                    <Switch
                      checkedChildren="Sim"
                      unCheckedChildren="Não"
                      onChange={(value: boolean) => {
                        const event: any = {
                          target: {
                            name: 'isActive',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      checked={values.isActive}
                      defaultChecked
                    />
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item label="Exibir" name="show">
                    <Switch
                      checkedChildren="Sim"
                      unCheckedChildren="Não"
                      onChange={(value: boolean) => {
                        const event: any = {
                          target: {
                            name: 'show',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      checked={values.show}
                      defaultChecked
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item>
            <Row justify={'center'} gutter={[20, 0]} className="mt-2">
              <Col>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Col>
              <Col>
                <Button type="default" htmlType="reset">
                  Limpar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );

  async function save(valuesForm: Product) {
    messageApi.open({
      key: 'register.products',
      type: 'loading',
      content: 'Enviando...',
      duration: 4,
    });

    const value = valuesForm.value;
    const amount = values.amount;

    const dataValues: Product = {
      name: valuesForm.name,
      value: value,
      isActive: valuesForm.isActive,
      unitMeasurement: valuesForm.unitMeasurement,
      show: valuesForm.show,
      amount: amount,
      ...valuesForm,
    };

    const saveSpending = amount != 0;

    if (saveSpending) {
      const spending: Spending = {
        name: dataValues.name,
        amount: amount,
        value: value,
      };

      const requestSpending = await SpendingController.store(spending);

      const spendingError = requestSpending.error;

      const messageSpending = requestSpending.message;

      const typeSpending = spendingError ? 'error' : 'success';

      const tranlateMessage = await TranslateController.get(messageSpending);

      if (spendingError) {
        messageApi.open({
          key: 'register.products',
          type: typeSpending,
          content: tranlateMessage.text,
          duration: 4,
        });
        return;
      }
    }

    const request = await ProductController.store({
      ...dataValues,
    });

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    setTimeout(() => {
      messageApi.open({
        key: 'register.products',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      if (!error) {
        setValues(initialValues);
      }
    }, 1000);
  }
};
