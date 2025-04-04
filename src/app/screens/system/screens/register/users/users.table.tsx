import { useRef, useState } from 'react';
import {
  Button,
  Col,
  Input,
  InputRef,
  Row,
  Space,
  Table,
  TableProps,
} from 'antd';
import { UserClient } from '../../../../../types/user/user';
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
  SorterResult,
} from 'antd/es/table/interface';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { SearchOutlined } from '@ant-design/icons';
import { TranslateController } from '../../../../../controller/translate/translate.controller';

interface DataType {
  key: number;
  id: number;
  userName: string;
  email: string;
  userType: string;
  isActive: boolean;
}

type DataIndex = keyof DataType;

interface Props {
  valuesTable: UserClient[];
  loading: boolean;
  getRowValues: (values: UserClient) => any;
}

export const UsersTable = (props: Props) => {
  const loading = props.loading;

  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({
    order: 'ascend',
    columnKey: 'finalClientName',
  });

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    _selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _dataIndex: DataIndex,
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const handleChange: TableProps<DataType>['onChange'] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
    title: string,
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 10 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Pesquisar ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSearch(selectedKeys as string[], confirm, dataIndex);
              close();
            }}
            icon={<AiOutlineSearch size={20} />}
            size="middle"
          >
            Pesquisar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        rev="true"
        style={{ color: filtered ? '#1890ff' : undefined }}
      />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      key: 'userName',

      title: 'Nome',

      dataIndex: 'userName',

      sortOrder: sortedInfo.columnKey === 'userName' ? sortedInfo.order : null,

      sorter: (a, b) => a.userName.localeCompare(b.userName),

      ellipsis: true,

      ...getColumnSearchProps('userName', 'Nome'),
    },
    {
      key: 'email',

      title: 'email',

      dataIndex: 'email',

      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
    },
    {
      key: 'userType',

      title: 'Função',

      dataIndex: 'userType',

      sortOrder: sortedInfo.columnKey === 'userType' ? sortedInfo.order : null,
      render: (value) => (
        <Row>
          <Col>{TranslateController.getNoAsync(value).text.toUpperCase()}</Col>
        </Row>
      ),
    },
    {
      key: 'isActive',

      title: 'Ativo',

      dataIndex: 'isActive',

      render: (isActive: boolean) => {
        return <div>{isActive ? 'Sim' : 'Não'}</div>;
      },
    },
    {
      key: 'action',

      title: 'Ações',

      width: 100,

      render: (data: DataType) => {
        return (
          <Row>
            <Col>
              <Button
                onClick={() => {
                  props.getRowValues({
                    emailUser: data.email,
                    isActive: data.isActive,
                    nameUser: data.userName,
                    userType: data.userType,
                    ...(data as any),
                  });
                }}
              >
                <BiEdit size={20} />
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Row className="m-0 mb-5 justify-content-center">
      <Col span={24}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={initTable()}
          onChange={handleChange}
          pagination={{
            defaultPageSize: 5,
            showTotal: () => (
              <Row justify={'space-between'} gutter={[40, 0]}>
                <Col>
                  <strong>
                    Total de usuários: {props.valuesTable.length}{' '}
                  </strong>
                </Col>
                <Col>
                  <strong>
                    Ativos:{' '}
                    {props.valuesTable.filter((value) => value.isActive).length}
                  </strong>
                </Col>
              </Row>
            ),
            pageSizeOptions: [5, 10, 20],
          }}
          scroll={{ y: 540, x: 200 }}
        />
      </Col>
    </Row>
  );

  function initTable(): DataType[] {
    const valuesData: UserClient[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      return values.push({
        key: index,
        id: value.id as any,
        userName: value.userName,
        userType: value.userType,
        isActive: value.isActive,
        ...value,
      });
    });

    return values;
  }
};
