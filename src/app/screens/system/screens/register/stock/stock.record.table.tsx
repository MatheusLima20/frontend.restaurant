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
import { Product } from '../../../../../types/product/product';
import { BiEdit } from 'react-icons/bi';

interface DataType {
  key: number;
  id: number;
  name: string;
  platform: number;
  value: number;
  amount: number;
  unitMeasurement: string;
  isActive: boolean;
  show: boolean;
}

type DataIndex = keyof DataType;

interface Props {
  valuesTable: Product[];
  loading: boolean;
  getRowValues: (values: Product) => any;
}

export const StockRecordTable = (props: Props) => {
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
      key: 'name',

      title: 'Nome',

      dataIndex: 'name',

      width: 130,

      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,

      sorter: (a, b) => a.name.localeCompare(b.name),

      ellipsis: true,

      ...getColumnSearchProps('name', 'Nome'),
    },
    {
      key: 'value',

      title: 'Valor',

      dataIndex: 'value',

      defaultSortOrder: 'descend',

      sortOrder: sortedInfo.columnKey === 'value' ? sortedInfo.order : null,

      sorter: (a, b) => a.value - b.value,

      width: 50,
    },
    {
      key: 'amount',

      title: 'Quantidade',

      dataIndex: 'amount',

      width: 70,

      sortOrder: sortedInfo.columnKey === 'amount' ? sortedInfo.order : null,

      sorter: (a, b) => a.amount - b.amount,
    },
    {
      key: 'unitMeasurement',

      title: 'Unidade',

      dataIndex: 'unitMeasurement',

      width: 50,

      sortOrder:
        sortedInfo.columnKey === 'unitMeasurement' ? sortedInfo.order : null,

      sorter: (a, b) => a.unitMeasurement.localeCompare(b.unitMeasurement),
    },
    {
      key: 'isActive',

      title: 'Ativo',

      dataIndex: 'isActive',

      width: 50,

      render: (data: any) => {
        return <div>{data ? 'Sim' : 'Não'}</div>;
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
                    id: data.id,
                    name: data.name,
                    value: data.value,
                    amount: data.amount,
                    isActive: data.isActive,
                    show: data.show,
                    unitMeasurement: data.unitMeasurement,
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
                <strong>Produtos: {props.valuesTable.length}</strong>
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
    const valuesData: Product[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      return values.push({
        key: index,
        id: value.id,
        name: value.name,
        amount: value.amount,
        value: value.value,
        unitMeasurement: value.unitMeasurement,
        show: value.show,
        ...value,
      });
    });

    return values;
  }
};
