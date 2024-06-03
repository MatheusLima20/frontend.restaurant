import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Switch, message } from 'antd';
import { Product } from '../../../../../types/product/product';
import { ProvisionsController } from '../../../../../controller/provisions/provisions.controller';
import { BsBox2Fill } from 'react-icons/bs';
import { Spending } from '../../../../../types/spending/spending';
import { SpendingController } from '../../../../../controller/spending/spending.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { StockRecordTable } from './stock.record.table';

const initialValues = {
  id: 0,
  name: '',
  value: 0,
  isActive: true,
  unitMeasurement: 'KG',
  amount: 0,
};

export const StockRecordForm = () => {
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
          <strong>Controle de Estoque</strong>
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

            <Col md={22}>
              <Row justify={'end'}>
                <Col>
                  <Form.Item
                    label="Ativo"
                    name="isActive"
                    tooltip="Caso o produto não seja mais usado, deixar desmarcado."
                  >
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
                  type="dashed"
                  disabled={values.id === 0}
                  onClick={() => {
                    stock(1);
                  }}
                >
                  Adicionar
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
        <StockRecordTable
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
    const amount = values.amount;

    const dataValues: Product = {
      name: valuesForm.name,
      value: value,
      isActive: valuesForm.isActive,
      unitMeasurement: valuesForm.unitMeasurement,
      show: false,
      amount: amount,
      ...valuesForm,
    };

    let request;

    const id = values.id;

    if (id === 0) {
      request = await ProvisionsController.store({
        isPlate: false,
        ...dataValues,
      });
    } else {
      request = await ProvisionsController.patch(id, { ...dataValues });
    }

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (!error && id === 0) {
      await saveSpending(dataValues);
    }

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

  async function stock(add: number) {
    setLoading(true);

    messageApi.open({
      key: 'register.products',
      type: 'loading',
      content: 'Enviando...',
      duration: 4,
    });

    const amount = values.amount * add;

    const dataValues: any = {
      name: values.name,
      value: values.value,
      isActive: values.isActive,
      unitMeasurement: values.unitMeasurement,
      show: false,
      amount: amount,
      add: true,
    };

    const id = values.id;

    const request = await ProvisionsController.patch(id, { ...dataValues });

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (amount > 0) {
      await saveSpending(dataValues);
    }

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

  async function saveSpending(product: Product) {
    const amount = product.amount;

    const saveSpending = amount != 0;

    if (saveSpending) {
      const spending: Spending = {
        name: product.name,
        amount: amount,
        value: product.value,
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
  }

  async function getProduct() {
    setLoading(true);

    const request = await ProvisionsController.get(false);

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setValuesTable(data);
    }
  }
};
