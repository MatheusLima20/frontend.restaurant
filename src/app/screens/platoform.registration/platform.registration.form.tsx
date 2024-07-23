import React, { useState } from 'react';
import {
  FaRegistered,
  FaRegRegistered,
  FaStreetView,
  FaUserCircle,
} from 'react-icons/fa';
import { BsCardHeading } from 'react-icons/bs';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { FiMapPin, FiXCircle } from 'react-icons/fi';
import { GiModernCity } from 'react-icons/gi';
import { BiCheckCircle, BiCurrentLocation, BiHappy } from 'react-icons/bi';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { Button, Col, Form, Input, message, Radio, Row, Steps } from 'antd';
import { IoDiamondOutline } from 'react-icons/io5';
import { MdBusinessCenter, MdEmail } from 'react-icons/md';
import { GrStreetView } from 'react-icons/gr';
import { Masks } from '../../util/masks/masks';
import { UserMain } from '../../types/user/user';
import { UserController } from '../../controller/user/user.controller';
import { AddressSearchCEP } from '../../types/address/address';
import { CepController } from '../../controller/cep/cep.controller';
import { StringFormatter } from '../../util/string.formatter/string.formatter';
import './platform.resgistrations.css';

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
      content: (
        <Row justify={'center'} className="mt-5 text-center">
          <Col md={24}>
            <Form.Item
              name="radio-button"
              rules={[
                {
                  required: true,
                  message: (
                    <div className="mt-5">Por favor, escolha um plano!</div>
                  ),
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="Iniciante" className="h-100">
                  <div title="Iniciante" className="m-4" style={{ width: 300 }}>
                    <p>
                      <Row align={'middle'} gutter={[70, 0]}>
                        <Col
                          span={24}
                          className="fs-5 text-center border-2 mt-1"
                        >
                          <strong>
                            <br />
                          </strong>
                        </Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'} gutter={[70, 0]}>
                        <Col>
                          <BiHappy size={30} />
                        </Col>
                        <Col className="fs-5">
                          <strong>Iniciante</strong>
                        </Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Pedidos Ilimitados</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">1 Caixa Por Dia</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">8 Mesas</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">4 Usuários</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <FiXCircle color="red" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Gastos.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <FiXCircle color="red" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Vendas.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <FiXCircle color="red" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Lucro.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row justify={'center'} align={'middle'}>
                        <Col className="fs-5">
                          <strong>Apenas R$ 99,90/Mês</strong>
                        </Col>
                      </Row>
                    </p>
                  </div>
                </Radio.Button>
                <Radio.Button value="Profissional" className="h-100">
                  <div
                    title="Profissional"
                    className="m-4"
                    style={{ width: 300 }}
                  >
                    <p>
                      <Row align={'middle'} gutter={[70, 0]}>
                        <Col span={24} className="text-center">
                          <div className="border rounded-pill border-danger border-2 ">
                            Mais Popular
                          </div>
                        </Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'} gutter={[70, 0]}>
                        <Col>
                          <MdBusinessCenter size={30} />
                        </Col>
                        <Col className="fs-5">
                          <strong>Profissional</strong>
                        </Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Pedidos Ilimitados</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">3 Caixas Por Dia</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">20 Mesas</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">8 Usuários</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Gastos.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Vendas.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <FiXCircle color="red" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Lucro.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row justify={'center'} align={'middle'}>
                        <Col className="fs-5">
                          <strong>Apenas R$ 149,90/Mês</strong>
                        </Col>
                      </Row>
                    </p>
                  </div>
                </Radio.Button>
                <Radio.Button value="Premium" className="h-100">
                  <div title="Premium" className="m-4" style={{ width: 300 }}>
                    <p>
                      <Row align={'middle'} gutter={[70, 0]}>
                        <Col span={24} className="fs-5 text-center mt-1">
                          <strong>
                            <br />
                          </strong>
                        </Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'} gutter={[70, 0]}>
                        <Col span={24}>
                          <strong> </strong>
                        </Col>
                        <Col>
                          <IoDiamondOutline size={30} />
                        </Col>
                        <Col className="fs-5">
                          <strong>Premium</strong>
                        </Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Pedidos Ilimitados</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Caixas Por Dia: A combinar</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Mesas: A combinar</Col>
                      </Row>
                    </p>
                    <p>
                      <Row justify={'start'} align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Usuários: A combinar</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Gastos.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Vendas.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row align={'middle'}>
                        <Col>
                          <BiCheckCircle color="green" size={20} />
                        </Col>
                        <Col className="fs-5">Relatório de Lucro.</Col>
                      </Row>
                    </p>
                    <p>
                      <Row justify={'center'} align={'middle'}>
                        <Col className="fs-5">
                          <strong>Negociável R$/Mês</strong>
                        </Col>
                      </Row>
                    </p>
                  </div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      ),
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
                <Button type="primary" htmlType="submit" onClick={next}>
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
      address: {
        district: values.district,
        addressCodePostal: values.addressCodePostal,
        addressNumber: values.addressNumber,
        street: values.street,
        phoneNumber: values.phoneNumber,
      } as any,
    };

    return;
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
