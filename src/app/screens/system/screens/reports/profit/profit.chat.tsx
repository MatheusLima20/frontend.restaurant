import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Form, Row, Select } from 'antd';
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
import { OrderController } from '../../../../../controller/order/order.controller';
import { SpendingController } from '../../../../../controller/spending/spending.controller';
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

const labels = ['Gastos', 'Vendas', 'Lucro'];

export const ProfitChart = () => {
  const [chart, setChart] = useState('barv');
  const [totalSell, setTotalSell] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);

  useEffect(() => {
    searchSell(dayjs().format('YYYY-MM'));
    searchSpending(dayjs().format('YYYY-MM'));
  }, []);

  return (
    <Row justify={'center'} className="mt-5 mb-5" gutter={[0, 30]}>
      <Col span={24} className="text-center">
        <h2>
          <strong>Lucro</strong>
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
            searchSpending(value);
          }}
        />
      </Col>
      <Col span={20}>
        <Row justify={'center'}>
          <Col span={24} className="text-center">
            <strong>
              Lucro R${' '}
              {(totalSell - totalSpending).toLocaleString('pt-br', {
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

    const data = request.data;
    const total = data.total;

    setTotalSell(total);
  }

  async function searchSpending(searchDate: any) {
    const date = dayjs(searchDate).format('YYYY-MM');

    const request = await SpendingController.get(date);

    const data = request.data;
    const total = data.total;

    setTotalSpending(total);
  }

  function initGraphic() {
    const valuesMonths: number[] = [];

    const values = [totalSpending, totalSell, totalSell - totalSpending];

    for (let index = 0; index < labels.length; index++) {
      valuesMonths.push(values[index]);
    }

    const result = [
      {
        fill: true,
        label: 'Total R$',
        data: valuesMonths,
        backgroundColor: [
          'rgba(220,20,60, 0.9)',
          'rgba(0,255,127, 0.9)',
          'rgba(30,144,255, 0.9)',
        ],
      },
    ];

    return result;
  }
};
