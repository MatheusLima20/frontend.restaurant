import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Row, Select, Switch } from 'antd';
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
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
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
      text: 'Gastos',
    },
  },
};

export const ReportsSellChart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState<Order[]>([]);
  const [chart, setChart] = useState('barv');
  const [total, setTotal] = useState(0);
  const [isMoney, setMoney] = useState(true);

  useEffect(() => {
    searchSell(dayjs().format('YYYY-MM'));
  }, []);

  return (
    <Row justify={'center'} className="mt-5 mb-5" gutter={[0, 30]}>
      <Col span={24} className="text-center">
        <h2>
          <strong>Relatório de Vendas</strong>
        </h2>
      </Col>
      <Col>
        <Form.Item label="Gráfico">
          <Select
            title="Tipo de Gráfico"
            defaultValue={chart}
            style={{ width: 200 }}
            onChange={(value) => {
              setChart(value);
            }}
            options={[
              { value: 'barv', label: 'Barra Vertical' },
              { value: 'barh', label: 'Barra Horizontal' },
              { value: 'pie', label: 'Pizza' },
              { value: 'areachat', label: 'Área' },
              { value: 'radar', label: 'Radar' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col span={24} className="text-center">
        <DatePicker
          defaultValue={dayjs()}
          format={'MM-YYYY'}
          picker="month"
          onChange={(value) => {
            searchSell(value);
          }}
        />
      </Col>
      <Col span={24} className="text-center">
        <Switch
          defaultValue={isMoney}
          checkedChildren="Total em R$"
          unCheckedChildren="Total em Vendas"
          onChange={(value) => {
            setMoney(value);
            changeGraphic();
          }}
        />
      </Col>
      <Col span={20}>
        <Row justify={'center'}>
          <Col span={24} className="text-center">
            <strong>
              Total R${' '}
              {total.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </strong>
          </Col>
          <Col span={20}>
            {chart === 'barv' && (
              <Bar
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'barh' && (
              <Bar
                options={{ ...options, indexAxis: 'y' as const }}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'pie' && (
              <Pie
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'areachat' && (
              <Line
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'radar' && (
              <Radar
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );

  async function searchSell(searchDate: any) {
    const date = dayjs(searchDate).format('YYYY-MM');

    const request = await OrderController.getByDate(date);

    setLabels([]);

    const data = request.data;
    const total = data.total;

    setTotal(total);
    setValues(data.orders);
  }

  function changeGraphic() {
    const data = values;

    setValues([]);

    setValues(data);
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
