import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Result,
  Row,
  Select,
  Switch,
  message,
} from 'antd';
import { Product, RawMaterial } from '../../../../../types/product/product';
import { ProvisionsController } from '../../../../../controller/provisions/provisions.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';
import { ProductMobileRegisterList } from './product.register.mobile.list';
import { RawMaterialForm } from './raw.material.form';
import { RawMaterialController } from '../../../../../controller/raw.material/raw.material.controller';
import { UserDataLogged } from '../../../../../types/user/user';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { Plan } from '../../../../../types/plan/plan';
import { IoDiamondOutline } from 'react-icons/io5';
import { SystemConf } from '../../../../../types/system.conf/system.conf';

const initialValues = {
  id: 0,
  name: '',
  value: 0,
  productType: 'PRATO',
  show: true,
  toCook: true,
};

const user: UserDataLogged = cookies.get('data.user');

const systemConf: SystemConf = cookies.get('start.types.objects');

const productType = systemConf.productType;

const textContact = 'Olá%20gostaria%20de%20mudar%20para%20o%20plano%20Premium';

export const ProductMobileRegisterForm = () => {
  const plan: Plan = user.plan as any;
  const isPremium = plan === 'Premium';

  const [messageApi, contextHolder] = message.useMessage();

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const [loadingRawForm, setLoadingRawForm] = useState(false);

  const [valuesTable, setValuesTable] = useState<Product[]>([]);

  const [stok, setStok] = useState<Product[]>([]);

  const [rawMaterial, setRawMaterial] = useState<RawMaterial[]>([]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    getProduct();
    getStock();
  }, []);

  return (
    <Row className="mt-5" gutter={[0, 20]}>
      {contextHolder}
      <Col span={24} className="text-center">
        <h2>
          <strong>Cadastro de Produtos</strong>
        </h2>
      </Col>

      <Col span={24}>
        <Form
          name="product.register"
          autoComplete="on"
          layout='vertical'
          initialValues={values}
          fields={[
            {
              name: 'name',
              value: values.name,
            },
            {
              name: 'value',
              value: values.value,
            },
            {
              name: 'productType',
              value: values.productType,
            },
            {
              name: 'show',
              value: values.show,
            },
            {
              name: 'toCook',
              value: values.toCook,
            },
          ]}
          onFinish={save}
        >
          <Row justify={'center'}>
            <Col span={24}>
              <Row justify={'center'} gutter={[30, 10]} className='text-center'>
                <Col span={22}>
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      { required: true, message: 'Digite o nome do produto!' },
                    ]}
                  >
                    <Input
                      name="name"
                      placeholder="Digite o nome..."
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>

                <Col span={22}>
                  <Form.Item
                    label="Valor"
                    name="value"
                    rules={[
                      {
                        required: true,
                        message: 'Digite o valor!',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="value"
                      onChange={handleChange}
                      value={values.value}
                      prefix={<span>R$</span>}
                    />
                  </Form.Item>
                </Col>

                <Col span={22}>
                  <Form.Item label="Tipo" name="productType">
                    <Select
                      onChange={(value: string) => {
                        const event: any = {
                          target: {
                            name: 'productType',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      value={values.productType}
                      options={productType.map((type) => {
                        return { value: type.name, label: type.name };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    label="Exibir"
                    name="show"
                    tooltip="Caso deseje que o produto seja exibido em pedidos, deixar marcado."
                  >
                    <Switch
                      checkedChildren="Sim"
                      unCheckedChildren="Não"
                      onChange={(value: boolean) => {
                        const event: any = {
                          target: {
                            name: 'show',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      checked={values.show}
                      defaultChecked
                    />
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    label="Para a Cozinha"
                    name="toCook"
                    tooltip="Caso este produto seja feito na cozinha."
                  >
                    <Switch
                      checkedChildren="Sim"                      
                      unCheckedChildren="Não"
                      onChange={(value: boolean) => {
                        const event: any = {
                          target: {
                            name: 'toCook',
                            value: value,
                          },
                        };
                        handleChange(event);
                      }}
                      checked={values.toCook}
                      defaultChecked
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Row justify={'center'} gutter={[20, 0]} className="mt-2">
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Salvar
                    </Button>
                  </Col>
                  <Col>
                    <Button type="default" onClick={clearValues}>
                      Limpar
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>

      {isPremium && (
        <>
          {!loadingRawForm && (
            <Col span={24}>
              <RawMaterialForm
                stok={stok}
                onSave={(values) => {
                  setRawMaterial(values);
                }}
                onRemove={getRawMaterialById}
                items={rawMaterial.map((item) => {
                  return {
                    id: item.id,
                    productId: item.productId,
                    rawMaterialId: item.rawMaterialId,
                    amount: item.amount,
                  };
                })}
              />
            </Col>
          )}
        </>
      )}

      {!isPremium && (
        <Col span={22}>
          <Result
            icon={<IoDiamondOutline size={30} />}
            subTitle={
              <strong>
                Obtenha a função de baixa automatica com o plano Premium
              </strong>
            }
            extra={
              <Button
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=5585992669501&text=${textContact}`}
                type="primary"
              >
                Atualizar Plano
              </Button>
            }
          />
        </Col>
      )}

      <Col span={24}>
        <ProductMobileRegisterList
          loading={loading}
          getRowValues={(editValues: Product) => {
            getRawMaterialById(editValues.id);
            setValues(editValues);
          }}
          valuesTable={valuesTable}
        />
      </Col>
    </Row>
  );

  async function save(valuesForm: Product) {
    setLoading(true);

    messageApi.open({
      key: 'register.products',
      type: 'loading',
      content: 'Enviando...',
      duration: 4,
    });

    const value = valuesForm.value;

    const dataValues: Product = {
      name: valuesForm.name,
      value: value,
      isActive: true,
      isPlate: true,
      toCook: valuesForm.toCook,
      productType: valuesForm.productType,
      show: valuesForm.show,
      ...valuesForm,
    };

    let request;

    const id = values.id;

    if (id === 0) {
      request = await ProvisionsController.store({
        ...dataValues,
      });

      const data = request.data;

      const hasRawMaterial = rawMaterial.length !== 0;

      if (hasRawMaterial) {
        saveRawMaterial(data.id);
      }
    } else {
      request = await ProvisionsController.patch(id, { ...dataValues });
      const hasRawMaterial = rawMaterial.length !== 0;

      if (hasRawMaterial) {
        saveRawMaterial(id);
      }
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
        clearValues();
      }
    }, 1000);
    await getProduct();
  }

  async function saveRawMaterial(productId: number) {
    const values = rawMaterial.map((value) => {
      const amount = Number.parseFloat(String(value.amount));
      return {
        id: value.id,
        productId: productId,
        rawMaterialId: value.rawMaterialId,
        amount: amount,
      };
    });

    let request: any;

    for (let index = 0; index < values.length; index++) {
      const element = values[index];

      const id = element.id;

      if (!id) {
        request = await RawMaterialController.store({ ...element } as any);
      } else {
        request = await RawMaterialController.patch(id, { ...element } as any);
      }

      const error = request.error;

      if (error) {
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
        }, 1000);
        break;
      }
    }
  }

  async function getProduct() {
    setLoading(true);

    const request = await ProvisionsController.getPlates();

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setValuesTable(data);
    }
  }

  async function getStock() {
    setLoading(true);

    const request = await ProvisionsController.get();

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setStok(data);
    }
  }

  async function getRawMaterialById(id: number) {
    setLoadingRawForm(true);
    const request = await RawMaterialController.getById(id);

    const data = request.data;

    if (data) {
      setRawMaterial(data);
      setTimeout(() => {
        setLoadingRawForm(false);
      }, 500);
    }
  }

  function clearValues() {
    setValues(initialValues);
    setRawMaterial([]);
    setLoadingRawForm(true);
    setTimeout(() => {
      setLoadingRawForm(false);
    }, 500);
  }
};
