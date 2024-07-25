import React, { useRef, useState } from 'react';

import { Button, Col, Input, InputRef, Row, Space, Table } from 'antd';

import { ColumnsType, TableProps } from 'antd/es/table';

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
import dayjs from 'dayjs';

interface DataType {
  key: number;
  id: number;
  startValue: number;
  isOpen: boolean;
  createdAt: string;
  totalBoxDay: number;
  totalWithStartValue: number;
}

type DataIndex = keyof DataType;

interface Props {
  valuesTable: BoxDay[];
  loading: boolean;
  getRowValues: (values: BoxDay) => any;
}

const initialValues = {
  id: 0,
  startValue: 0,
  total: 0,
  date: '',
  isCancelled: false,
};

export const BoxDayTable = (props: Props) => {
  const loading = props.loading;
  const ref = useRef();

  const [orders, setOrders] = useState([]);
  const [boxDay, setBoxDay] = useState(initialValues);
  const [loadingPrint, setLoadingPrint] = useState(false);

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

      fixed: 'left',

      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,

      sorter: (a, b) => a.id - b.id,

      ellipsis: true,

      ...getColumnSearchProps('id', 'ID'),
    },
    {
      key: 'isOpen',

      title: 'Aberto',

      width: 100,

      dataIndex: 'isOpen',

      render: (data: any) => {
        return <div>{data ? 'Sim' : 'Não'}</div>;
      },
    },
    {
      key: 'startValue',

      title: 'Valor Inicial',

      dataIndex: 'startValue',

      width: 150,

      render: (startValue: number) => {
        return (
          <div>
            {startValue.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        );
      },
    },
    {
      key: 'totalBoxDay',

      title: 'Total em Vendas',

      dataIndex: 'totalBoxDay',

      width: 150,

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
      key: 'totalWithStartValue',

      title: 'Total Com o Caixa',

      dataIndex: 'totalWithStartValue',

      width: 150,

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

      width: 150,

      dataIndex: 'createdAt',
    },
    {
      key: 'action',

      title: 'Ações',

      width: 250,

      fixed: 'right',

      render: (data: DataType) => {
        return (
          <Row gutter={[10, 20]}>
            <Col>
              <Button
                title="Pedidos Efetuados"
                onClick={() => {
                  getByBoxDay(data, false);
                }}
                loading={loadingPrint}
              >
                <BsPrinter size={20} />
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  getByBoxDay(data, true);
                }}
                danger={true}
                title="Cancelados"
                loading={loadingPrint}
              >
                <BsPrinter size={20} />
              </Button>
            </Col>
            <Col>
              <Button
                loading={loadingPrint}
                onClick={() => {
                  props.getRowValues({
                    id: data.id,
                    isOpen: data.isOpen,
                    createdAt: data.createdAt,
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
        isCancelled={boxDay.isCancelled}
      />
    </Row>
  );

  function initTable(): DataType[] {
    const valuesData: BoxDay[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      const createdAt = dayjs(value.createdAt).format('DD/MM/YYYY HH:mm:ss');

      return values.push({
        key: index,
        id: value.id,
        isOpen: value.isOpen,
        startValue: value.startValue,
        createdAt: createdAt,
        totalBoxDay: value.totalBoxDay,
        totalWithStartValue: value.totalWithStartValue,
      });
    });

    return values;
  }

  async function getByBoxDay(values: DataType, isCancelled: boolean) {
    setOrders([]);
    setLoadingPrint(true);
    const request = await OrderController.getByBoxDay(values.id, isCancelled);

    const data = request.data;
    const orders = data.orders;
    const total = data.total;

    if (orders) {
      setBoxDay({
        id: values.id,
        startValue: values.startValue,
        total: total,
        date: values.createdAt,
        isCancelled: isCancelled,
      });
      setOrders(orders);
    }
    setTimeout(() => {
      setLoadingPrint(false);
      handlePrint();
    }, 1000);
  }
};
