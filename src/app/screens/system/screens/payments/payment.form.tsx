import { useState } from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import EfiPay from 'payment-token-efi';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaCcMastercard } from 'react-icons/fa';
import { RiVisaFill } from 'react-icons/ri';
import { PaymentsController } from '../../../../controller/payments/payments.controller';
import { TranslateController } from '../../../../controller/translate/translate.controller';

const initialValues = {
  cardNumber: '',
  brand: '',
  cvv: '',
  expirationMonth: '',
  expirationYear: '',
  installments: '1',
};

export const PaymentsForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Row className="mt-5">
      {contextHolder}
      <Col span={24}>
        <Form
          name="payments"
          autoComplete="on"
          initialValues={values}
          layout="vertical"
          fields={[
            {
              name: 'cardNumber',
              value: values.cardNumber,
            },
            {
              name: 'brand',
              value: values.brand,
            },
            {
              name: 'cvv',
              value: values.cvv,
            },
            {
              name: 'expirationMonth',
              value: values.expirationMonth,
            },
            {
              name: 'expirationYear',
              value: values.expirationYear,
            },
          ]}
          onFinish={save}
        >
          <Row justify={'center'}>
            <Col span={24}>
              <Row justify={'center'} gutter={[30, 10]}>
                <Col md={7}>
                  <Form.Item
                    label="Numero"
                    name="cardNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Digite o numero do cartão!',
                      },
                    ]}
                  >
                    <Input
                      name="cardNumber"
                      type="number"
                      placeholder="Digite o numero..."
                      onChange={handleChange}
                      onBlur={identifyBrand}
                      suffix={<>{cardBrand()}</>}
                    />
                  </Form.Item>
                </Col>

                <Col md={4}>
                  <Form.Item
                    label="Codigo"
                    name="cvv"
                    rules={[
                      {
                        required: true,
                        message: 'Digite o valor!',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="cvv"
                      placeholder="ex: 123"
                      onChange={handleChange}
                      value={values.cvv}
                    />
                  </Form.Item>
                </Col>

                <Col md={4}>
                  <Form.Item label="Parcelas" name="installments">
                    <Select
                      onChange={(value: string) => {
                        const event: any = {
                          target: {
                            name: 'installments',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      value={values.installments}
                      options={[{ value: 1 }, { value: 2 }].map((type) => {
                        return {
                          value: type.value,
                          label: type.value + ' vezes',
                        };
                      })}
                    />
                  </Form.Item>
                </Col>

                <Col md={3}>
                  <Form.Item
                    label="Mês"
                    name="expirationMonth"
                    rules={[
                      {
                        required: true,
                        message: 'Digite o mês!',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="expirationMonth"
                      placeholder="ex: 07"
                      onChange={handleChange}
                      value={values.expirationMonth}
                    />
                  </Form.Item>
                </Col>

                <Col md={3}>
                  <Form.Item
                    label="Ano"
                    name="expirationYear"
                    rules={[
                      {
                        required: true,
                        message: 'Digite o ano!',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="expirationYear"
                      placeholder="ex: 2024"
                      onChange={handleChange}
                      value={values.expirationYear}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Row justify={'center'} gutter={[20, 0]} className="mt-2">
                      <Col>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                        >
                          Salvar
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type="default"
                          onClick={clearValues}
                          loading={loading}
                        >
                          Limpar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );

  async function save() {
    setLoading(true);

    messageApi.open({
      key: 'payment.signature',
      type: 'loading',
      content: 'Aguarde enviando...',
      duration: 4,
    });

    const cardToken = await generatePaymentToken();

    const installments: number = parseInt(values.installments);

    const request = await PaymentsController.store({
      clientInstallments: installments,
      paymentToken: cardToken,
    });

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    setTimeout(() => {
      messageApi.open({
        key: 'payment.signature',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      setLoading(false);
      setValues(initialValues);
    }, 1000);
  }

  async function generatePaymentToken() {
    try {
      const result: any = await EfiPay.CreditCard.setAccount(
        '305d0b9acbca11b44fff1a0ee46c4c0b',
      )
        .setEnvironment('sandbox') // 'production' or 'sandbox'
        .setCreditCardData({
          brand: values.brand,
          number: values.cardNumber,
          cvv: values.cvv,
          expirationMonth: values.expirationMonth,
          expirationYear: values.expirationYear,
          reuse: false,
        })
        .getPaymentToken();

      const payment_token = result.payment_token;
      const card_mask = result.card_mask;

      console.log('payment_token', payment_token);
      console.log('card_mask', card_mask);
      return result.payment_token;
    } catch (error: any) {
      console.log('Código: ', error.code);
      console.log('Nome: ', error.error);
      console.log('Mensagem: ', error.error_description);
      return error;
    }
  }

  async function identifyBrand() {
    try {
      const brand = await EfiPay.CreditCard.setCardNumber(
        values.cardNumber,
      ).verifyCardBrand();
      setValues({ ...values, brand: brand });
      console.log('Bandeira: ', brand);
    } catch (error: any) {
      console.log('Código: ', error.code);
      console.log('Nome: ', error.error);
      console.log('Mensagem: ', error.error_description);
    }
  }

  function cardBrand() {
    const size = 20;
    let icon = <CiCreditCard1 size={size} />;

    switch (values.brand) {
      case 'mastercard':
        icon = <FaCcMastercard size={size} />;
        break;
      case 'visa':
        icon = <RiVisaFill size={size} />;
        break;
    }

    return icon;
  }

  function clearValues() {
    setValues(initialValues);
  }
};
