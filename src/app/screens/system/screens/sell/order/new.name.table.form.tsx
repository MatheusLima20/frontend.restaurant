import { Button, Col, Input, Popconfirm, Row, message } from 'antd';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdRemoveCircle } from 'react-icons/md';
import { TableController } from '../../../../../controller/table/table.controller';
import { TranslateController } from '../../../../../controller/translate/translate.controller';

interface Props {
  id: number;
  onUpdate?: () => any;
}

export const NewNameTableForm = (props: Props) => {
  const id: number = props.id;

  const [messageApi, contextHolder] = message.useMessage();
  const [newTableName, setNewTableName] = useState('');
  const [changeTable, setChangeTable] = useState(false);

  return (
    <Row className="mt-3" gutter={[0, 20]}>
      {contextHolder}
      {changeTable && (
        <>
          <Col span={16}>
            <Input
              value={newTableName}
              onChange={(value) => {
                setNewTableName(value.target.value);
              }}
              placeholder="Digite o novo nome..."
            />
          </Col>
          <Col span={8}>
            <Button
              onClick={() => {
                patchTable(id, undefined, newTableName);
              }}
            >
              Salvar
            </Button>
          </Col>
        </>
      )}
      <Col span={12}>
        <Button
          type="text"
          size="large"
          onClick={() => {
            setChangeTable(!changeTable);
          }}
        >
          <BiEdit size={30} />
        </Button>
      </Col>
      <Col span={12}>
        <Popconfirm
          title="Desativação de Mesa"
          description="Deseja realmente desativar a mesa?"
          onConfirm={() => {
            patchTable(id, false);
          }}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="text" danger size="large">
            <MdRemoveCircle size={30} />
          </Button>
        </Popconfirm>
      </Col>
    </Row>
  );

  async function patchTable(id: number, isActive?: boolean, name?: string) {
    const request = await TableController.patch(id, isActive, name);

    const error = request.error;

    const message = request.message;

    const type = error ? 'error' : 'success';

    const tranlateMessage = await TranslateController.get(message);

    if (error) {
      messageApi.open({
        key: 'register.tables',
        type: type,
        content: tranlateMessage.text,
        duration: 4,
      });
      return;
    }
    setChangeTable(false);
    props.onUpdate();
  }
};
