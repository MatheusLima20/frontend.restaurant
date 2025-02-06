import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { BoxDayTable } from './box.day.table';
import { BoxDayController } from '../../../../../controller/box.day/box.day.controller';
import { BoxDay } from '../../../../../types/box.day/box.day';

const initialValues = {
  id: 0,
  isOpen: true,
  startValue: 0,
  createdAt: '',
};

export const BoxDayForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const [valuesBoxDay, setValuesBoxDay] = useState([]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    getBoxDay();
  }, []);

  return (
    <Row className="mt-5" gutter={[0, 30]}>
      {contextHolder}
      <Col span={20} className="text-center">
        <h2>
          <strong>Caixa</strong>
        </h2>
      </Col>

      <Col span={20}>
        <Form
          name="basic"
          autoComplete="on"
          fields={[{ name: 'startValue', value: values.startValue }]}
          onFinish={save}
        >
          <Row justify={'center'}>
            <Col span={8}>
              <Form.Item
                label="Valor incial"
                name="startValue"
                rules={[
                  {
                    required: true,
                    message: 'Por valor, digite o valor.',
                  },
                ]}
              >
                <Input
                  name="startValue"
                  type="number"
                  placeholder="Informe o valor incial..."
                  prefix="R$"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Row justify={'center'} gutter={[20, 0]} className="mt-2">
                  <Col>
                    <Button type="primary" htmlType="submit">
                      {values.id === 0
                        ? 'Novo Caixa'
                        : values.isOpen
                          ? 'Fechar Caixa'
                          : 'Abrir Caixa'}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="default"
                      htmlType="reset"
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

      <Col span={24}>
        <BoxDayTable
          loading={loading}
          getRowValues={(editValues: BoxDay) => {
            setValues(editValues);
          }}
          onOpdate={getBoxDay}
          valuesTable={valuesBoxDay}
        />
      </Col>
    </Row>
  );

  async function save() {
    setLoading(true);

    messageApi.open({
      key: 'register.products',
      type: 'loading',
      content: 'Enviando...',
      duration: 4,
    });

    let request;

    const id = values.id;

    if (id === 0) {
      const data = {
        startValue: values.startValue,
      };
      request = await BoxDayController.store(data);
    } else {
      request = await BoxDayController.patch(id);
    }

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    setTimeout(() => {
      messageApi.open({
        key: 'register.boxday',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      setLoading(false);
      if (!error) {
        setValues(initialValues);
        getBoxDay();
      }
    }, 1000);
  }

  async function getBoxDay() {
    setLoading(true);

    const request = await BoxDayController.get();

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setValuesBoxDay(data);
    }
  }
};
