import React from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product } from '../../../../../types/product/product';
import { StringFormatter } from '../../../../../util/string.formatter/string.formatter';

type Props = {
  stok: Product[];
  items: any[];
  onSave: (values: any[]) => void;
};

export const RawMaterialForm = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const stok = props.stok.sort((a, b) => a.name.localeCompare(b.name));

  const items = props.items;

  const onSave = props.onSave;

  return (
    <Row justify={'center'}>
      {contextHolder}
      <Col span={24}>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          initialValues={{ items: items }}
          autoComplete="off"
        >
          <Row gutter={20} justify={'center'}>
            <Col span={24}>
              <Form.List name="items" initialValue={items}>
                {(fields, { add, remove }) => {
                  return (
                    <Row justify={'center'}>
                      <Col span={24}>
                        {fields.map(({ key, name, ...restField }) => {
                          let hasId = false;
                          if (items.length) {
                            hasId = items[key]?.id !== undefined;
                          }

                          return (
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
                                        label:
                                          value.name +
                                          ' : ' +
                                          value.unitMeasurement,
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
                                  <Input
                                    placeholder="Quantidade..."
                                    type="number"
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Button
                                  disabled={hasId}
                                  onClick={() => remove(name)}
                                >
                                  <MinusCircleOutlined size={50} />
                                </Button>
                              </Col>
                            </Row>
                          );
                        })}
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Produtos
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              </Form.List>
            </Col>
            <Col>
              <Form.Item>
                <Button type="dashed" htmlType="submit">
                  Adicionar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );

  function onFinish(values: any) {
    const rawMaterial = values.items;

    if (!rawMaterial[0]) {
      return;
    }
    onSave(rawMaterial);
    messageApi.open({
      key: 'register.raw.material',
      type: 'info',
      content: 'Material Adicionado!',
      duration: 4,
    });
  }
};
