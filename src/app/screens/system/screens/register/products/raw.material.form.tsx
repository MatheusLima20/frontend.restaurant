import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';

type Props = {
  stok: Product[];
};

export const RawMaterialForm = (props: Props) => {
  const stok = props.stok.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Row justify={'center'}>
      <Col span={24}>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={20} justify={'center'}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'rawMaterialId']}
                        rules={[
                          {
                            required: true,
                            message: 'Selecione um item do estoque.',
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (
                              StringFormatter.replaceSpecialChars(
                                option?.label,
                              ).toLowerCase() ?? ''
                            ).includes(
                              StringFormatter.replaceSpecialChars(
                                input,
                              ).toLowerCase(),
                            )
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? '').toLowerCase(),
                              )
                          }
                          options={stok.map((value) => {
                            return {
                              value: value.id,
                              label: value.name + ' : ' + value.unitMeasurement,
                            };
                          })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        rules={[
                          {
                            required: true,
                            message: 'Digite a quantidade.',
                          },
                        ]}
                      >
                        <Input placeholder="Quantidade..." />
                      </Form.Item>
                    </Col>
                    <Col>
                      <MinusCircleOutlined
                        size={50}
                        onClick={() => remove(name)}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Adicionar Material do Estoque
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );

  function onFinish(values: any) {
    console.log('Received values of form:', values.items);
  }
};
