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
import { dateFormat } from "../../../../../util/date/date";
import { Log } from "../../../../../types/log/log";

interface DataType {
  key: number;
  id: number;
  title: string;
  text: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

interface Props {
  valuesTable: Log[];
  loading: boolean;
}

export const LogTable = (props: Props) => {
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

      width: 50,

      fixed: "left",

      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,

      sorter: (a, b) => a.id - b.id,

      ellipsis: true,
    },
    {
      key: "title",

      title: "Ação",

      width: 100,

      dataIndex: "title",

      render: (title: string) => {
        return <div>{title}</div>;
      },
    },
    {
      key: "text",

      title: "Descrição",

      dataIndex: "text",

      width: 250,

      render: (text: string) => {
        return <div>{text.replaceAll("undefined", "Não alterado")}</div>;
      },

      ...getColumnSearchProps("text", "Texto"),
    },
    {
      key: "createdAt",

      title: "Criando em:",

      dataIndex: "createdAt",

      width: 90,

      render: (createdAt: string) => {
        const date = dateFormat.formatTimebr(createdAt);

        return <div>{date}</div>;
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
                <strong>Registros: {props.valuesTable.length}</strong>
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
    const valuesData: Log[] = props.valuesTable;

    const values: DataType[] = [];

    valuesData.map((value, index) => {
      return values.push({
        key: index,
        id: value.id,
        text: value.text,
        title: value.title,
        createdAt: value.createdAt,
      });
    });

    return values;
  }
};
