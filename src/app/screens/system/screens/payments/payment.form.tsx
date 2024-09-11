import React from 'react';
import { Button, Col, Row } from 'antd';
import EfiPay from 'payment-token-efi';

export const PaymentsForm = () => {
  async function generatePaymentToken() {
    try {
      const result: any = await EfiPay.CreditCard.setAccount(
        '305d0b9acbca11b44fff1a0ee46c4c0b',
      )
        .setEnvironment('sandbox') // 'production' or 'sandbox'
        .setCreditCardData({
          brand: 'visa',
          number: '4485785674290087',
          cvv: '123',
          expirationMonth: '05',
          expirationYear: '2029',
          reuse: false,
        })
        .getPaymentToken();

      const payment_token = result.payment_token;
      const card_mask = result.card_mask;

      console.log('payment_token', payment_token);
      console.log('card_mask', card_mask);
    } catch (error: any) {
      console.log('Código: ', error.code);
      console.log('Nome: ', error.error);
      console.log('Mensagem: ', error.error_description);
    }
  }

  async function identifyBrand() {
    try {
      const brand =
        await EfiPay.CreditCard.setCardNumber(
          '4485785674290087',
        ).verifyCardBrand();

      console.log('Bandeira: ', brand);
    } catch (error: any) {
      console.log('Código: ', error.code);
      console.log('Nome: ', error.error);
      console.log('Mensagem: ', error.error_description);
    }
  }

  async function listInstallments() {
    try {
      const installments = await EfiPay.CreditCard.setAccount(
        '305d0b9acbca11b44fff1a0ee46c4c0b',
      )
        .setEnvironment('production') // 'production' or 'sandbox'
        .setBrand('visa')
        .setTotal(28990)
        .getInstallments();

      console.log('Parcelas', installments);
    } catch (error: any) {
      console.log('Código: ', error.code);
      console.log('Nome: ', error.error);
      console.log('Mensagem: ', error.error_description);
    }
  }

  return (
    <Row className="mt-5">
      <Col>
        <Button onClick={identifyBrand}>Bandeira</Button>
        <Button onClick={listInstallments}>Parcelamento</Button>
        <Button onClick={generatePaymentToken}>Gerar Token</Button>
      </Col>
    </Row>
  );
};
