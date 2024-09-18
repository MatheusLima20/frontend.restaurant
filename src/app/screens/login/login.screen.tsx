import { Button, Col, Form, Input, Row, message } from 'antd';
import { UserController } from '../../controller/user/user.controller';
import { UserLogin } from '../../types/user/user';
import { Images } from '../../config/images';

export const LoginScreen = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Row justify={'center'} align={'middle'} className="mt-3">
      {contextHolder}
      <Col className="text-center mb-3">
        <img src={Images.logo} width={'70%'} />
      </Col>
      <Col span={24}>
        <Row justify={'center'}>
          <Col md={8}>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={login}
              autoComplete="on"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, digite seu email!',
                    type: 'email',
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  { required: true, message: 'Por favor, digite sua senha!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Row justify={'center'}>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Enviar
                    </Button>
                  </Col>

                  <Col className="ms-5">
                    <Button type="default" htmlType="reset">
                      Limpar
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col>
        <Button type="link" href="/resgistration">
          <strong>Cadastrar-se</strong>
        </Button>
      </Col>
    </Row>
  );

  async function login(values: any) {
    const formValues: UserLogin = {
      email: values.email,
      password: values.password,
    };

    messageApi.open({
      key: 'login',
      type: 'loading',
      content: 'Carregando...',
    });

    const request = await UserController.login(formValues);

    const error = request.error;

    const message = request.message;

    if (!error) {
      setTimeout(() => {
        messageApi.open({
          key: 'login',
          type: 'success',
          content: message,
          duration: 2,
        });
      }, 1000);

      setTimeout(() => {
        document.location = '/';
      }, 2000);
    } else {
      setTimeout(() => {
        messageApi.open({
          key: 'login',
          type: 'error',
          content: message,
        });
      }, 1000);
    }
  }
};
