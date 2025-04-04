import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Switch,
} from 'antd';
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
import { Spending } from '../../../../../types/spending/spending';
import { SpendingController } from '../../../../../controller/spending/spending.controller';
import { BsGraphUpArrow } from 'react-icons/bs';
import { ReportDetails } from './reports.details';
import { useReactToPrint } from 'react-to-print';
import { BiPrinter } from 'react-icons/bi';
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

export const ReportsSpendingChart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState<Spending[]>([]);
  const [chart, setChart] = useState('barv');
  const [total, setTotal] = useState(0);
  const [isMoney, setMoney] = useState(true);
  const [graphic, setGraphic] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const showModal = () => {
    const chart = document.getElementById('chart');
    setGraphic(chart);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    searchSpending(dayjs().format('YYYY-MM'));
  }, []);

  return (
    <Row justify={'center'} className="mt-5 mb-5" gutter={[0, 30]}>
      <Col span={24} className="text-center">
        <h2>
          <strong>Relatório de Gastos</strong>
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
            searchSpending(value);
          }}
        />
      </Col>
      <Col span={24} className="text-center">
        <Switch
          defaultValue={isMoney}
          checkedChildren="Total em R$"
          unCheckedChildren="Quantidade Total"
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
          disabled={!values.length}
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
            spendig={values}
            graphic={graphic}
            total={total}
            ref={ref}
          />
        </Modal>
      </Col>
    </Row>
  );

  async function searchSpending(searchDate: any) {
    const date = dayjs(searchDate).format('YYYY-MM');

    const request = await SpendingController.get(date);

    setLabels([]);

    const error = request.error;

    if (!error) {
      const data = request.data;
      const total = data.total;

      setTotal(total);
      setValues(data.spending);
    }
  }

  function changeGraphic() {
    const data = values;

    setValues([]);

    setValues(data);
  }

  function initGraphic() {
    const valuesMonths: number[] = [];

    values.filter((value) => {
      const exists = labels.includes(value.name);

      if (!exists) {
        labels.push(value.name);
      }
    });

    labels.map((label) => {
      let spending = 0;
      values.map((value) => {
        if (value.name === label) {
          if (isMoney) {
            spending += value.amount * value.value;
          } else {
            spending += value.amount;
          }
        }
      });
      valuesMonths.push(spending);

      return;
    });

    const result = [
      {
        fill: true,
        label: isMoney ? 'Total R$' : 'Quantidade',
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
