import React, { useRef, useState } from 'react';

import { Button, Input, InputRef, Space, Table } from 'antd';

import { ColumnsType, TableProps } from 'antd/es/table';

import { Col, Row } from 'react-bootstrap';

import {
  ColumnType,
  FilterConfirmProps,
  SorterResult,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { BoxDay } from '../../../../../types/box.day/box.day';
import { BsPrinter } from 'react-icons/bs';
import { OrderController } from '../../../../../controller/order/order.controller';
import { PrintBoxDay } from './print.box.day';
import { useReactToPrint } from 'react-to-print';

interface DataType {
  key: number;
  id: number;
  isOpen: boolean;
  createdAt: string;
  totalBoxDay: number;
}

type DataIndex = keyof DataType;

interface Props {
  valuesTable: BoxDay[];
  loading: boolean;
  getRowValues: (values: BoxDay) => any;
}

const initialValues = {
  id: 0,
  total: 0,
  date: '',
};

export const BoxDayTable = (props: Props) => {
  const loading = props.loading;
  const ref = useRef();

  const [orders, setOrders] = useState([]);
  const [boxDay, setBoxDay] = useState(initialValues);

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

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

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
      key: 'id',

      title: 'Codigo',

      dataIndex: 'id',

      width: 130,

      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,

      sorter: (a, b) => a.id - b.id,

      ellipsis: true,

      ...getColumnSearchProps('id', 'ID'),
    },
    {
      key: 'isOpen',

      title: 'Aberto',

      dataIndex: 'isOpen',

      render: (data: any) => {
        return <div>{data ? 'Sim' : 'Não'}</div>;
      },
    },
    {
      key: 'totalBoxDay',

      title: 'Total',

      dataIndex: 'totalBoxDay',

      render: (total: number) => {
        return (
          <div>
            {total.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        );
      },
    },
    {
      key: 'createdAt',

      title: 'Criado em',

      dataIndex: 'createdAt',

      sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,

      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      key: 'action',

      title: 'Ações',

      render: (data: DataType) => {
        return (
          <Row>
            <Col>
              <Button>
                <BsPrinter
                  size={20}
                  onClick={() => {
                    setBoxDay({
                      id: data.id,
                      total: data.totalBoxDay,
                      date: data.createdAt,
                    });
                    getOrdersByTable(data.id);
                  }}
                />
              </Button>
            </Col>
            <Col>
              <Button>
                <BiEdit
                  size={20}
                  onClick={() => {
                    props.getRowValues({
                      id: data.id,
                      isOpen: data.isOpen,
                      createdAt: data.createdAt,
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
      <Col span={24}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={initTable()}
          onChange={handleChange}
          pagination={{
            defaultPageSize: 5,
            showTotal: () => (
              <div className="text-black">
                <strong>Caixas: {props.valuesTable.length}</strong>
              </div>
            ),
            pageSizeOptions: [5, 10, 20],
          }}
          scroll={{ y: 540, x: 200 }}
        />
      </Col>
      <PrintBoxDay
        ref={ref}
        orders={orders}
        id={boxDay.id}
        total={boxDay.total}
        date={boxDay.date}
      />
    </Row>
  );

  function initTable(): DataType[] {
    const valuesData: BoxDay[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      return values.push({
        key: index,
        id: value.id,
        isOpen: value.isOpen,
        createdAt: value.createdAt,
        totalBoxDay: value.totalBoxDay,
        ...value,
      });
    });

    return values;
  }

  async function getOrdersByTable(id: number) {
    setOrders([]);
    const request = await OrderController.getByBoxDay(id);

    const data = request.data;
    const orders = data.orders;

    if (orders) {
      setOrders(orders);
    }
    setTimeout(() => {
      handlePrint();
    }, 500);
  }
};
