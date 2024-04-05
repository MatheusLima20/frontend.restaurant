import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  FaRegistered,
  FaRegRegistered,
  FaStreetView,
  FaUserCircle,
} from 'react-icons/fa';
import { BsCardHeading } from 'react-icons/bs';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { FiMapPin } from 'react-icons/fi';
import { GiModernCity } from 'react-icons/gi';
import { BiCurrentLocation } from 'react-icons/bi';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { Button, Form, Input, message } from 'antd';
import { MdEmail } from 'react-icons/md';
import { GrStreetView } from 'react-icons/gr';
import { Masks } from '../../util/masks/masks';
import { UserMain } from '../../types/user/user';
import { UserController } from '../../controller/user/user.controller';
import { companyCPFCNPJ } from '../../util/platform.number/platform.number';
import { AddressSearchCEP } from '../../types/address/address';

type InitialValues = {
  cpfcnpj: string;
  state: string;
  city: string;
  companyName: string;
  platformName: string;
  corporateName: string;
  password: string;
  platformCPFCNPJ: number;
  street: string;
  addressCodePostal: string;
  phoneNumber: string;
  addressNumber: number;
  district: string;
  email: string;
  userName: string;
  userType: string;
  id: number;
};

const initialValues: InitialValues = {
  cpfcnpj: '',
  state: '',
  city: '',
  companyName: '',
  platformName: '',
  corporateName: '',
  password: '',
  platformCPFCNPJ: 0,
  street: '',
  addressCodePostal: '',
  phoneNumber: '',
  addressNumber: 0,
  district: '',
  email: '',
  userName: '',
  userType: '',
  id: 0,
};

export const PlatformRegistrationForm = () => {
  const [values, setValues] = useState(initialValues);

  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleReset = () => {
    const element = document.getElementById('form') as any;
    element.reset();
    setValues(initialValues);
  };

  return (
    <Row>
      {contextHolder}
      <Row className="mb-5">
        <Form
          id="form"
          layout="vertical"
          size="large"
          requiredMark={false}
          fields={[
            { name: 'cnpj', value: Masks.cnpj(companyCPFCNPJ) },
            { name: 'phone', value: values.phoneNumber },
            { name: 'state', value: values.state },
            { name: 'city', value: values.city },
            { name: 'street', value: values.street },
            { name: 'district', value: values.district },
            { name: 'addressCodePostal', value: values.addressCodePostal },
            { name: 'email', value: values.email },
            { name: 'userName', value: values.userName },
            {
              name: 'addressNumber',
              value: values.addressNumber ? values.addressNumber : '',
            },
            { name: 'corporateName', value: values.corporateName },
            { name: 'companyName', value: values.companyName },
          ]}
          onFinish={save}
        >
          <Row className="m-3 justify-content-center">
            <Row className="justify-content-between text-start">
              <Col md={6}>
                <Form.Item
                  label="Nome de Usuário"
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite seu nome!',
                    },
                  ]}
                >
                  <Input
                    name="userName"
                    onChange={handleChange}
                    placeholder="Digite seu nome..."
                    prefix={<FaUserCircle size={20} />}
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  label="Razão Social"
                  name="corporateName"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, insira a razão social!',
                    },
                  ]}
                >
                  <Input
                    name="corporateName"
                    onChange={handleChange}
                    placeholder="Digite a razão social..."
                    prefix={<FaRegistered size={20} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-content-between text-start">
              <Col md={6}>
                <Form.Item
                  label="Nome Fantasia"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite o nome fantasia!',
                    },
                  ]}
                >
                  <Input
                    name="companyName"
                    onChange={handleChange}
                    placeholder="Digite o nome fantasia..."
                    prefix={<FaRegRegistered size={20} />}
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  label="CNPJ"
                  name="cnpj"
                  rules={[
                    {
                      min: 18,
                      max: 18,
                      required: true,
                      message: 'Por favor, digite o CNPJ!',
                    },
                  ]}
                >
                  <Input
                    name="cnpj"
                    disabled
                    placeholder="Digite o CNPJ..."
                    prefix={<BsCardHeading size={20} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-content-between text-start">
              <Col md={6}>
                <Form.Item
                  label="Fone"
                  name="phone"
                  rules={[
                    {
                      min: 14,
                      max: 14,
                      required: true,
                      message: 'Por favor, digite o numero de telefone!',
                    },
                  ]}
                >
                  <Input
                    name="phone"
                    onChange={(event) => {
                      const value = event.target.value;
                      const mask = Masks.phone(value);
                      setValues({ ...values, phoneNumber: mask });
                    }}
                    placeholder="Digite o Telefone..."
                    prefix={<HiOutlineDevicePhoneMobile size={20} />}
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite o email!',
                      type: 'email',
                    },
                  ]}
                >
                  <Input
                    name="email"
                    onChange={handleChange}
                    placeholder="Digite o email..."
                    prefix={<MdEmail size={20} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-content-between text-start">
              <Col md={4}>
                <Form.Item
                  label="CEP"
                  name="addressCodePostal"
                  rules={[
                    {
                      min: 9,
                      required: true,
                      message: 'Por favor, digite o seu CEP!',
                    },
                  ]}
                >
                  <Input
                    name="addressCodePostal"
                    onChange={(event) => {
                      const value = event.target.value;
                      const mask = Masks.cep(value);
                      setValues({ ...values, addressCodePostal: mask });
                    }}
                    onBlur={(event) => {
                      searchCEP(event.target.value);
                    }}
                    placeholder="Digite seu CEP..."
                    prefix={<BiCurrentLocation size={20} />}
                  />
                </Form.Item>
              </Col>
              <Col md={4}>
                <Form.Item
                  label="Estado"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite o estado!',
                    },
                  ]}
                >
                  <Input
                    name="state"
                    disabled
                    prefix={<FiMapPin size={20} />}
                  />
                </Form.Item>
              </Col>
              <Col md={4}>
                <Form.Item
                  label="Cidade"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite a cidade!',
                    },
                  ]}
                >
                  <Input
                    name="city"
                    disabled
                    prefix={<GiModernCity size={20} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-content-between text-start">
              <Col md={4}>
                <Form.Item
                  label="Bairro"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite o seu bairro!',
                    },
                  ]}
                >
                  <Input
                    name="district"
                    onChange={handleChange}
                    placeholder="Digite seu bairro..."
                    prefix={<FaStreetView size={20} />}
                  />
                </Form.Item>
              </Col>

              <Col md={4}>
                <Form.Item
                  label="Rua"
                  name="street"
                  rules={[
                    {
                      required: true,
                      message: 'A rua é obrigatória!',
                    },
                  ]}
                >
                  <Input
                    name="street"
                    onChange={handleChange}
                    placeholder="Digite a rua..."
                    value={values.street}
                    prefix={<GrStreetView size={20} />}
                  />
                </Form.Item>
              </Col>

              <Col md={4}>
                <Form.Item
                  label="Numero"
                  name="addressNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite o numero do seu endereço!',
                    },
                  ]}
                >
                  <Input
                    name="addressNumber"
                    onChange={handleChange}
                    placeholder="Digite seu numero..."
                    prefix={<AiOutlineFieldNumber size={20} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-content-between text-start">
              <Col md={6}>
                <Form.Item
                  label="Senha"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite a senha!',
                    },
                  ]}
                >
                  <Input.Password
                    name="password"
                    onChange={handleChange}
                    placeholder="Digite a senha..."
                    prefix={<RiLockPasswordLine size={20} />}
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  label="Repita a Senha"
                  name="passwordRepeated"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite a confirmação da senha!',
                    },
                  ]}
                >
                  <Input.Password
                    name="passwordRepeated"
                    onChange={handleChange}
                    placeholder="Digite a senha novamente..."
                    prefix={<RiLockPasswordFill size={20} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-content-center text-center">
              <Col md={2} className="mt-3">
                <Button type="primary" htmlType="submit">
                  <strong>Enviar</strong>
                </Button>
              </Col>

              <Col md={2} className="mt-3">
                <Button type="default" onClick={handleReset}>
                  <strong>Limpar</strong>
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Row>
    </Row>
  );

  async function save(valuesForm: any) {
    messageApi.open({
      key: 'platform.registration',
      type: 'loading',
      content: 'Enviando...',
      duration: 7,
    });

    const dataValues: UserMain = {
      cpfcnpj: companyCPFCNPJ,
      email: valuesForm.email,
      companyName: valuesForm.companyName,
      corporateName: valuesForm.corporateName,
      password: valuesForm.password,
      userName: valuesForm.userName,
      passwordRepeated: valuesForm.passwordRepeated,
      platformName: valuesForm.companyName,
      address: {
        ...valuesForm.address,
        district: valuesForm.district,
        addressCodePostal: valuesForm.addressCodePostal,
        addressNumber: valuesForm.addressNumber,
        street: valuesForm.street,
        phoneNumber: valuesForm.phone,
      },
    };

    const request = await UserController.storePlatform({
      ...dataValues,
    });

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    setTimeout(() => {
      messageApi.open({
        key: 'platform.registration',
        type: type,
        content: message,
        duration: 7,
      });
      if (!error) {
        handleReset();

        setTimeout(() => {
          document.location = '/';
        }, 2000);
      }
    }, 1000);
  }

  async function searchCEP(cep: string) {
    const request = await CepController.get(cep);

    const data: AddressSearchCEP = request.data;

    if (cep) {
      setValues({
        ...values,
        city: data.city,
        state: data.state,
        district: data.neighborhood,
        street: data.street,
      });
    }
  }
};
