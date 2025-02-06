import { useRef, useState } from "react";
import { Button, Col, Input, InputRef, Row, Space, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import {
  ColumnType,
  FilterConfirmProps,
  SorterResult,
} from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { AiOutlineSearch } from "react-icons/ai";
import { Charges } from "../../../../types/charges/charges";
import { dateFormat } from "../../../../util/date/date";

interface DataType {
  key: number;
  id: number;
  isPay: boolean;
  description: string;
  payday: string;
  paidIn: string;
  value: number;
  payer: string;
}

type DataIndex = keyof DataType;

interface Props {
  valuesTable: Charges[];
  loading: boolean;
}

export const PaymentsTable = (props: Props) => {
  const loading = props.loading;

  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({
    order: "ascend",
    columnKey: "id",
  });

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    _selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _dataIndex: DataIndex
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const handleChange: TableProps<DataType>["onChange"] = (
    _pagination,
    _filters,
    sorter
  ) => {
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
    title: string
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
          style={{ marginBottom: 8, display: "block" }}
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
        style={{ color: filtered ? "#1890ff" : undefined }}
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
      key: "id",

      title: "Codigo",

      dataIndex: "id",

      width: 130,

      fixed: "left",

      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,

      sorter: (a, b) => a.id - b.id,

      ellipsis: true,

      ...getColumnSearchProps("id", "ID"),
    },
    {
      key: "payday",

      title: "Vencimento",

      dataIndex: "payday",

      width: 150,

      render: (payday: string) => {
        const date = dateFormat.formatbr(payday);

        return <div>{date}</div>;
      },
    },
    {
      key: "isPay",

      title: "Pago",

      width: 100,

      dataIndex: "isPay",

      render: (data: any) => {
        return <div>{data ? "Sim" : "Não"}</div>;
      },
    },
    {
      key: "paidIn",

      title: "Pago em",

      dataIndex: "paidIn",

      width: 150,

      render: (payIn: string) => {
        const datePay = payIn;

        const date = !datePay ? "---" : dateFormat.formatTimebr(payIn);

        return <div>{date}</div>;
      },
    },
    {
      key: "value",

      title: "Valor",

      dataIndex: "value",

      width: 150,

      render: (total: number) => {
        return (
          <div>
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
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
            defaultPageSize: 12,
            showTotal: () => (
              <div className="text-black">
                <strong>Pagamentos: {props.valuesTable.length}</strong>
              </div>
            ),
            pageSizeOptions: [5, 10, 20],
          }}
          scroll={{ y: 240, x: 200 }}
        />
      </Col>
    </Row>
  );

  function initTable(): DataType[] {
    const valuesData: Charges[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      return values.push({
        key: index,
        id: value.id,
        description: value.description,
        isPay: value.isPay,
        paidIn: value.paidIn,
        payday: value.payday,
        payer: value.payer,
        value: value.value,
      });
    });

    return values;
  }
};
