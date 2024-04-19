import { Button, Col, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { GiHotMeal } from 'react-icons/gi';
import { ProductController } from '../../../../../controller/product/products.controller';

export const SellOrderAdd = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getPlates();
  });

  return (
    <Row justify={'center'}>
      <Col>
        <GiHotMeal size={90} />
      </Col>
      <Col className="text-center mb-" span={24}>
        <strong>Pedidos</strong>
      </Col>
      <Col span={22}>
        <Col span={24}>
          <Form name="basic" autoComplete="on">
            <Row justify={'center'}>
              <Col span={24}>
                <Row gutter={[10, 10]}>
                  <Col md={24}>
                    <Form.Item
                      label="Unidade"
                      name="unitMeasurement"
                      rules={[
                        {
                          message: 'Por favor, selecione um prato!',
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        //onChange={(value: string) => {
                        //const event: any = {
                        //target: {
                        // name: 'unitMeasurement',
                        //value: value,
                        //},
                        //};
                        //handleChange(event);
                        //}}
                        //value={values.unitMeasurement}
                        options={products.map((value) => {
                          return { value: value.id, label: value.name };
                        })}
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
                    Adicionar
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    htmlType="reset"
                    onClick={() => {
                      //setValues(initialValues);
                    }}
                  >
                    Limpar
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Col>
    </Row>
  );

  async function getPlates() {
    const request = await ProductController.getPlates();

    const data = request.data;

    if (data) {
      setProducts(data);
    }
  }
};
