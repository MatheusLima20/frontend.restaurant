import { useEffect, useState } from "react";
import { Col, DatePicker, Row } from "antd";
import { LogController } from "../../../../../controller/log/log.controller";
import { Log } from "../../../../../types/log/log";
import { LogTable } from "./log.table";
import { dateFormat } from "../../../../../util/date/date";
import dayjs from "dayjs";

export const LogForm = () => {
  const [log, setLog] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const date = dateFormat.thisMonth();
    get(date);
  }, []);

  return (
    <Row className="mt-5" gutter={[0, 30]}>
      <Col span={24} className="text-center">
        <DatePicker
          defaultValue={dayjs()}
          format={"DD/MM/YYYY"}
          picker={"date"}
          onChange={(value) => {
            const date = value.format("YYYY-MM-DD");
            get(date);
          }}
        />
      </Col>

      <Col span={22}>
        <LogTable loading={loading} valuesTable={log} />
      </Col>
    </Row>
  );

  async function get(date: string) {
    setLog([]);
    setLoading(true);

    const request = await LogController.get(date);

    const data = request.data;

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data) {
      setLog(data);
    }
  }
};
