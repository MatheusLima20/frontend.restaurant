import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
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

export const ProfitMobileChart = () => {
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
    const date = dayjs(searchDate).format('YYYY-MM');

    const request = await OrderController.getByDate(date);

    const error = request.error;

    if (!error) {
      const data = request.data;
      const total = data.total;

      setTotalSell(total);
    }
  }

  async function searchSpending(searchDate: any) {
    const date = dayjs(searchDate).format('YYYY-MM');

    const request = await SpendingController.get(date);

    const error = request.error;

    if (!error) {
      const data = request.data;
      const total = data.total;
      setTotalSpending(total);
    }
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
