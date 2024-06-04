import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Switch, message } from 'antd';
import { Product } from '../../../../../types/product/product';
import { ProvisionsController } from '../../../../../controller/provisions/provisions.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { ProductRegisterTable } from './product.register.table';

const initialValues = {
  id: 0,
  name: '',
  value: 0,
  unitMeasurement: 'PR',
  show: true,
};

export const ProductRegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const [valuesTable, setValuesTable] = useState([]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Row className="mt-5" gutter={[0, 30]}>
      {contextHolder}
      <Col span={20} className="text-center">
        <h2>
          <strong>Cadastro de Produtos</strong>
        </h2>
      </Col>

      <Col span={20}>
        <Form
          name="basic"
          autoComplete="on"
          defaultValue={0}
          initialValues={values}
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
              name: 'unitMeasurement',
              value: values.unitMeasurement,
            },
            {
              name: 'show',
              value: values.show,
            },
          ]}
          onFinish={save}
        >
          <Row justify={'center'}>
            <Col span={24}>
              <Row gutter={[30, 10]}>
                <Col md={8}>
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      { required: true, message: 'Digite o nome do produto!' },
                    ]}
                  >
                    <Input
                      name="name"
                      placeholder="Digite o nome..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>

                <Col md={6}>
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
                  <Form.Item label="Unidade" name="unitMeasurement">
                    <Select
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
                        { value: 'PR', label: 'Prato' },
                        { value: 'BB', label: 'Bebida' },
                        { value: 'SB', label: 'Sobremesa' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item
                    label="Exibir"
                    name="show"
                    tooltip="Caso deseje que o produto seja exibido em pedidos, deixar marcado."
                  >
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
                  Salvar
                </Button>
              </Col>
              <Col>
                <Button
                  type="default"
                  onClick={() => {
                    setValues(initialValues);
                  }}
                >
                  Limpar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>

      <Col span={24}>
        <ProductRegisterTable
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
      key: 'register.products',
      type: 'loading',
      content: 'Enviando...',
      duration: 4,
    });

    const value = valuesForm.value;

    const dataValues: Product = {
      name: valuesForm.name,
      value: value,
      isActive: true,
      isPlate: true,
      unitMeasurement: valuesForm.unitMeasurement,
      show: valuesForm.show,
      ...valuesForm,
    };

    let request;

    const id = values.id;

    if (id === 0) {
      request = await ProvisionsController.store({
        ...dataValues,
      });
    } else {
      request = await ProvisionsController.patch(id, { ...dataValues });
    }

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
      setLoading(false);
      if (!error) {
        setValues(initialValues);
      }
    }, 1000);
    await getProduct();
  }

  async function getProduct() {
    setLoading(true);

    const request = await ProvisionsController.get(true);

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setValuesTable(data);
    }
  }
};
