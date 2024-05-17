import React, { useRef, useState } from 'react';
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

interface DataType {
  key: number;
  id: number;
  userName: string;
  email: string;
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
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataIndex: DataIndex,
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const handleChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
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
      key: 'isActive',

      title: 'Ativo',

      dataIndex: 'isActive',

      sortOrder: sortedInfo.columnKey === 'isActive' ? sortedInfo.order : null,

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
              <Button>
                <BiEdit
                  size={20}
                  onClick={() => {
                    props.getRowValues({
                      id: data.id,
                      ...(data as any),
                    });
                  }}
                />
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Row className="m-0 mb-5 justify-content-center">
      <Col>
        <Table
          columns={columns}
          loading={loading}
          dataSource={initTable()}
          onChange={handleChange}
          pagination={{
            defaultPageSize: 5,
            showTotal: () => (
              <div className="text-black">
                <strong>Itens: {props.valuesTable.length}</strong>
              </div>
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
        ...value,
      });
    });

    return values;
  }
};
