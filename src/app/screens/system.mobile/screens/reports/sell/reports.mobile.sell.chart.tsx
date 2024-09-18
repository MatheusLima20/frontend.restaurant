import { useEffect, useState } from 'react';
import { Col, DatePicker, Row, Switch } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import dayjs from 'dayjs';
import { Order } from '../../../../../types/order/order';
import { OrderController } from '../../../../../controller/order/order.controller';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Vendas',
    },
  },
};

export const ReportsMobileSellChart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [isMoney, setMoney] = useState(true);
  const [isMonth, setMonth] = useState(false);

  useEffect(() => {
    const date = isMonth ? 'YYYY-MM' : 'YYYY-MM-DD';
    searchSell(dayjs().format(date));
  }, []);

  return (
    <Row justify={'space-evenly'} align={'stretch'} gutter={[0, 20]}>
      <Col span={24} className="text-center">
        <h6>
          <strong>Relatório de Vendas</strong>
        </h6>
      </Col>
      <Col span={24} className="text-center">
        <DatePicker
          defaultValue={dayjs()}
          size="middle"
          format={isMonth ? 'MM-YYYY' : 'DD-MM-YYYY'}
          picker={isMonth ? 'month' : 'date'}
          onChange={(value) => {
            searchSell(value);
          }}
        />
      </Col>
      <Col md={8} className="text-center">
        <Switch
          defaultValue={isMonth}
          checkedChildren="Por mês"
          unCheckedChildren="Por dia"
          onChange={(value) => {
            setMonth(value);
          }}
        />
      </Col>
      <Col span={8} className="text-center">
        <Switch
          defaultValue={isMoney}
          checkedChildren="Total em R$"
          unCheckedChildren="Total em Vendas"
          onChange={(value) => {
            setMoney(value);
          }}
        />
      </Col>
      <Col span={24}>
        <Row justify={'center'}>
          <Col span={24} className="text-center">
            <strong>
              Total R${' '}
              {total.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </strong>
          </Col>
          <Col span={24}>
            <Pie
              options={options}
              data={{
                labels: labels,
                datasets: initGraphic(),
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );

  async function searchSell(searchDate: any) {
    const dateFormat = isMonth ? 'YYYY-MM' : 'YYYY-MM-DD';

    const date = dayjs(searchDate).format(dateFormat);

    const request = await OrderController.getByDate(date);

    setLabels([]);

    const error = request.error;

    if (!error) {
      const data = request.data;
      const total = data.total;

      setTotal(total);
      setValues(data.orders);
    }
  }

  function initGraphic() {
    const valuesMonths: number[] = [];

    values.filter((value) => {
      const exists = labels.includes(value.productName);

      if (!exists) {
        labels.push(value.productName);
      }
    });

    labels.map((label) => {
      let sell = 0;
      values.map((value) => {
        if (value.productName === label) {
          if (isMoney) {
            sell += value.amount * value.value;
          } else {
            sell += value.amount;
          }
        }
      });
      valuesMonths.push(sell);

      return;
    });

    const result = [
      {
        fill: true,
        label: isMoney ? 'Total R$' : 'Vendido',
        data: valuesMonths,
        backgroundColor: [
          'rgba(30,144,255, 0.9)',
          'rgba(221,160,221, 0.9)',
          'rgba(220,20,60, 0.9)',
          'rgba(0,255,255, 0.9)',
          'rgba(255,165,0, 0.9)',
          'rgba(0,100,0, 0.9)',
          'rgba(255,215,0, 0.9)',
          'rgba(216,191,216, 0.9)',
          'rgba(210,180,140, 0.9)',
          'rgba(175,238,238, 0.9)',
          'rgba(0,250,154, 0.9)',
          'rgba(251, 5, 200, 0.9)',
        ],
      },
    ];

    return result;
  }
};
