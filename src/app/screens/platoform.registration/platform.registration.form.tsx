import { useState } from 'react';
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
import { Button, Col, Form, Input, message, Row, Steps } from 'antd';
import { MdEmail } from 'react-icons/md';
import { GrStreetView } from 'react-icons/gr';
import { Masks } from '../../util/masks/masks';
import { UserMain } from '../../types/user/user';
import { UserController } from '../../controller/user/user.controller';
import { AddressSearchCEP } from '../../types/address/address';
import { CepController } from '../../controller/cep/cep.controller';
import { StringFormatter } from '../../util/string.formatter/string.formatter';
import './platform.resgistrations.css';
import { ChoosePlans } from './choose.plans';

type InitialValues = {
  cpfcnpj: string;
  state: string;
  city: string;
  companyName: string;
  platformName: string;
  corporateName: string;
  password: string;
  passwordRepeated: string;
  street: string;
  addressCodePostal: string;
  phoneNumber: string;
  addressNumber: number;
  district: string;
  email: string;
  userName: string;
  userType: string;
  id: number;
  plan: string;
  isMonthPlan: boolean;
};

const initialValues: InitialValues = {
  cpfcnpj: '',
  state: '',
  city: '',
  companyName: '',
  platformName: '',
  corporateName: '',
  password: '',
  passwordRepeated: '',
  street: '',
  addressCodePostal: '',
  phoneNumber: '',
  addressNumber: 0,
  district: '',
  email: '',
  userName: '',
  userType: '',
  id: 0,
  plan: '',
  isMonthPlan: true,
};

export const PlatformRegistrationForm = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [values, setValues] = useState(initialValues);

  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const steps = [
    {
      title: 'Dados Iniciais',
      content: (
        <Row justify={'center'} gutter={[30, 20]} className="mt-5">
          <Col md={12}>
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
          <Col md={12}>
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
          <Col md={12}>
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
          <Col md={12}>
            <Form.Item
              label="CPF/CNPJ"
              name="cpfcnpj"
              rules={[
                {
                  max: 18,
                  required: true,
                  message: 'Por favor, digite o CNPJ!',
                },
              ]}
            >
              <Input
                name="cpfcnpj"
                onChange={(event) => {
                  const value = event.target.value;
                  const mask = cpfCnpjFormatter(value);
                  setValues({ ...values, cpfcnpj: mask });
                }}
                placeholder="Digite..."
                prefix={<BsCardHeading size={20} />}
              />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Contato',
      content: (
        <Row gutter={[30, 20]} className="mt-5">
          <Col md={12}>
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
          <Col md={12}>
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
      ),
    },
    {
      title: 'Endereço',
      content: (
        <Row justify={'center'} gutter={[30, 20]} className="mt-5">
          <Col md={8}>
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
          <Col md={8}>
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
              <Input name="state" disabled prefix={<FiMapPin size={20} />} />
            </Form.Item>
          </Col>
          <Col md={8}>
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
              <Input name="city" disabled prefix={<GiModernCity size={20} />} />
            </Form.Item>
          </Col>
          <Col md={8}>
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

          <Col md={8}>
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

          <Col md={8}>
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
      ),
    },
    {
      title: 'Senha de acesso',
      content: (
        <Row justify={'center'} gutter={[30, 20]} className="mt-5">
          <Col md={12}>
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
          <Col md={12}>
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
      ),
    },
    {
      title: 'Plano',
      content: <ChoosePlans handleChange={handleChange} />,
    },
  ];

  const handleReset = () => {
    const element = document.getElementById('form') as any;
    element.reset();
    setValues(initialValues);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Row justify={'center'}>
      {contextHolder}
      <Col span={24}>
        <Form
          id="form"
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={() => {
            const toNext = current < steps.length - 1;
            if (toNext) {
              next();
              return;
            }
            save();
          }}
          fields={[
            {
              name: 'cpfcnpj',
              value: values.cpfcnpj,
            },
            { name: 'phone', value: values.phoneNumber },
            { name: 'state', value: values.state },
            { name: 'city', value: values.city },
            { name: 'street', value: values.street },
            { name: 'district', value: values.district },
            { name: 'addressCodePostal', value: values.addressCodePostal },
            { name: 'email', value: values.email },
            { name: 'userName', value: values.userName },
            { name: 'plan', value: values.plan },
            {
              name: 'addressNumber',
              value: values.addressNumber ? values.addressNumber : '',
            },
            { name: 'corporateName', value: values.corporateName },
            { name: 'companyName', value: values.companyName },
            { name: 'password', value: values.password },
            { name: 'passwordRepeated', value: values.passwordRepeated },
          ]}
        >
          <Row justify={'center'}>
            <Steps current={current} items={items} />
            <Col span={23}>{steps[current].content}</Col>
            <Col span={23} style={{ marginTop: 24 }}>
              {current < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Proxímo
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  <strong>Enviar</strong>
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Anterior
                </Button>
              )}
              {current == 0 && (
                <Button
                  style={{ margin: '0 8px', textDecoration: 'none' }}
                  href="/"
                >
                  Voltar
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );

  async function save() {
    messageApi.open({
      key: 'platform.registration',
      type: 'loading',
      content: 'Enviando...',
      duration: 7,
    });

    const cpfcnpj = StringFormatter.onlyNumber(values.cpfcnpj);

    const dataValues: UserMain = {
      cpfcnpj: cpfcnpj,
      email: values.email,
      companyName: values.companyName,
      corporateName: values.corporateName,
      password: values.password,
      userName: values.userName,
      passwordRepeated: values.passwordRepeated,
      platformName: values.companyName,
      isMonthPlan: values.isMonthPlan,
      plan: values.plan,
      address: {
        district: values.district,
        addressCodePostal: values.addressCodePostal,
        addressNumber: values.addressNumber,
        street: values.street,
        phoneNumber: values.phoneNumber,
      } as any,
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

    if (data) {
      setValues({
        ...values,
        city: data.city,
        state: data.state,
        district: data.neighborhood,
        street: data.street,
      });
    }
  }

  function cpfCnpjFormatter(value: string) {
    let cpfCnpj: string = value;

    if (cpfCnpj.length <= 14) {
      cpfCnpj = Masks.cpf(cpfCnpj);
    } else {
      cpfCnpj = Masks.cnpj(cpfCnpj);
    }

    return cpfCnpj;
  }
};
