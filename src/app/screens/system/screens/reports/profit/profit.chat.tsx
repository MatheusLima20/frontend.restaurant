import { useEffect, useRef, useState } from 'react';
import { Button, Col, DatePicker, Form, Modal, Row, Select } from 'antd';
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
import { BsGraphUpArrow } from 'react-icons/bs';
import { ReportDetails } from './reports.details';
import { useReactToPrint } from 'react-to-print';
import { BiPrinter } from 'react-icons/bi';
import { RawMaterialController } from '../../../../../controller/raw.material/raw.material.controller';
import { Profit } from '../../../../../types/product/product';
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
  const [graphic, setGraphic] = useState<any>();
  const [chart, setChart] = useState('barv');
  const [totalSell, setTotalSell] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [profit, setProfit] = useState<Profit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    const chart = document.getElementById('chart');
    setGraphic(chart);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  useEffect(() => {
    searchSell(dayjs().format('YYYY-MM'));
    searchSpending(dayjs().format('YYYY-MM'));
    getProfit();
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
                id="chart"
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'barh' && (
              <Bar
                id="chart"
                options={{ ...options, indexAxis: 'y' as const }}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'pie' && (
              <Pie
                id="chart"
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'areachat' && (
              <Line
                id="chart"
                options={options}
                data={{
                  labels: labels,
                  datasets: initGraphic(),
                }}
              />
            )}

            {chart === 'radar' && (
              <Radar
                id="chart"
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
      <Col span={20} className="text-center">
        <Button
          title="Detalhes"
          size="large"
          disabled={!totalSell}
          onClick={showModal}
        >
          <BsGraphUpArrow size={30} />
        </Button>
      </Col>
      <Col span={22}>
        <Modal
          open={isModalOpen}
          onCancel={() => {
            handleOk();
          }}
          style={{ top: 20 }}
          width={'95%'}
          footer={() => (
            <Row justify={'space-between'}>
              <Col>
                <Button onClick={handlePrint}>
                  <BiPrinter size={20} />
                </Button>
              </Col>
              <Col>
                <Button onClick={handleOk}>Voltar</Button>
              </Col>
            </Row>
          )}
        >
          <ReportDetails
            ref={ref}
            profit={profit}
            graphic={graphic}
            totalSell={totalSell}
            totalSpending={totalSpending}
          />
        </Modal>
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

  async function getProfit() {
    const request = await RawMaterialController.getProfit();

    const error = request.error;

    if (!error) {
      const data = request.data;
      setProfit(data);
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
