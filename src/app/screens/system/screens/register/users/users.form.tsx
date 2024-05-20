import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Switch, message } from 'antd';
import { UsersTable } from './users.table';
import { UserController } from '../../../../../controller/user/user.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';

const initialValues = {
  id: 0,
  nameUser: '',
  emailUser: '',
  userType: '',
  password: '',
  repeatPassword: '',
  isActive: true,
};

export const UsersForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);
  const [valuesTable, setValuesTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const userType = [
    { userType: 'SUPER', label: 'SUPER' },
    { userType: 'ADM', label: 'ADM' },
    { userType: 'WAITER', label: 'GARÇOM' },
  ];

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Row justify={'center'} className="mt-5" gutter={[0, 40]}>
      {contextHolder}
      <Col span={22}>
        <h3 className="text-center">
          <strong>Usuários</strong>
        </h3>
      </Col>
      <Col span={22}>
        <Row justify={'center'}>
          <Col md={22}>
            <Form
              name="users"
              initialValues={{ remember: false }}
              fields={[
                { name: 'nameUser', value: values.nameUser },
                { name: 'emailUser', value: values.emailUser },
                { name: 'userType', value: values.userType },
                { name: 'password', value: values.password },
                { name: 'repeatPassword', value: values.repeatPassword },
              ]}
              onFinish={save}
              autoComplete="off"
            >
              <Row gutter={[20, 10]}>
                <Col md={8}>
                  <Form.Item
                    label="Nome"
                    name="nameUser"
                    rules={[
                      { required: true, message: 'Por favor, digite o nome!' },
                    ]}
                  >
                    <Input
                      name="nameUser"
                      placeholder="Digite o nome..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col md={8}>
                  <Form.Item
                    label="Email"
                    name="emailUser"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, digite o email...!',
                      },
                    ]}
                  >
                    <Input
                      name="emailUser"
                      placeholder="Digite o email..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col md={8}>
                  <Form.Item
                    label="Setor"
                    name="userType"
                    rules={[
                      {
                        message: 'Por favor, selecione um prato!',
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      value={userType}
                      onSelect={(value) => {
                        console.log(value);
                        setValues({ ...values, userType: value as any });
                      }}
                      placeholder="Selecione..."
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label.toLowerCase() ?? '').includes(
                          input.toLowerCase(),
                        )
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={userType.map((value) => {
                        return {
                          value: value.userType,
                          label: value.label,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col md={10}>
                  <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                      {
                        required: values.id === 0,
                        message: 'Por favor, digite sua senha!',
                      },
                    ]}
                  >
                    <Input.Password
                      name="password"
                      placeholder="Digite a senha..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col md={10}>
                  <Form.Item
                    label="Repita a Senha"
                    name="repeatPassword"
                    rules={[
                      {
                        required: values.id === 0,
                        message: 'Por favor, repita a senha!',
                      },
                    ]}
                  >
                    <Input.Password
                      name="repeatPassword"
                      placeholder="Digite novamente..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col md={4}>
                  <Form.Item
                    label="Ativo"
                    name="isActive"
                    tooltip="Se seu acesso será liberado ou não."
                  >
                    <Switch
                      checkedChildren="Sim"
                      unCheckedChildren="Não"
                      onChange={(value: boolean) => {
                        const event: any = {
                          target: {
                            name: 'isActive',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      checked={values.isActive}
                      defaultChecked
                    />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item>
                    <Row justify={'center'}>
                      <Col>
                        <Button type="primary" htmlType="submit">
                          Enviar
                        </Button>
                      </Col>

                      <Col className="ms-5">
                        <Button
                          type="default"
                          htmlType="reset"
                          onClick={() => {
                            setValues(initialValues);
                            getUsers();
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
        </Row>
      </Col>
      <Col span={22}>
        <UsersTable
          valuesTable={valuesTable}
          loading={loading}
          getRowValues={(values) => {
            setValues({
              id: values.id,
              emailUser: values.email,
              isActive: values.isActive,
              nameUser: values.userName,
              userType: values.userType,
              ...values,
            } as any);
          }}
        />
      </Col>
    </Row>
  );

  async function save() {
    setLoading(true);

    messageApi.open({
      key: 'register.spending',
      type: 'loading',
      content: 'Enviando...',
      duration: 4,
    });

    const user: any = {
      userName: values.nameUser,
      email: values.emailUser,
      userType: values.userType,
      isActive: values.isActive,
      password: values.password,
      passwordRepeated: values.repeatPassword,
    };

    const id = values.id;

    let request;

    if (id == 0) {
      request = await UserController.storeEmployee(user);
    } else {
      request = await UserController.patch(id, { ...user });
    }

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    setTimeout(() => {
      messageApi.open({
        key: 'register.spending',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      setLoading(false);
      if (!error) {
        setValues(initialValues);
      }
    }, 1000);
    await getUsers();
  }

  async function getUsers() {
    setLoading(true);

    const request = await UserController.getUsers('WAITER');

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setValuesTable(data);
    }
  }
};
