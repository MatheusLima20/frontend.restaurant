import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, message } from 'antd';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { BoxDayTable } from './box.day.table';
import { BoxDayController } from '../../../../../controller/box.day/box.day.controller';
import { BoxDay } from '../../../../../types/box.day/box.day';

const initialValues = {
  id: 0,
  isOpen: true,
  createdAt: '',
};

export const BoxDayForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const [valuesBoxDay, setValuesBoxDay] = useState([]);

  useEffect(() => {
    getBoxDay();
  }, []);

  return (
    <Row className="mt-5" gutter={[0, 30]}>
      {contextHolder}
      <Col span={20} className="text-center">
        <h2>
          <strong>Cadastro de Caixa</strong>
        </h2>
      </Col>

      <Col span={20}>
        <Form name="basic" autoComplete="on" onFinish={save}>
          <Form.Item>
            <Row justify={'center'} gutter={[20, 0]} className="mt-2">
              <Col>
                <Button type="primary" htmlType="submit">
                  {values.id === 0
                    ? 'Adicionar Caixa'
                    : values.isOpen
                      ? 'Fechar Caixa'
                      : 'Abrir Caixa'}
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
        <BoxDayTable
          loading={loading}
          getRowValues={(editValues: BoxDay) => {
            setValues(editValues);
          }}
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
      request = await BoxDayController.store();
    } else {
      request = await BoxDayController.patch(id);
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
    await getBoxDay();
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
