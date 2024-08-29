import React from 'react';
import './App.css';
import { AppNavigation } from './app/app.navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import { ConfigProvider } from 'antd';
import ptBr from 'antd/es/locale/pt_BR';
import { Content } from 'antd/es/layout/layout';

function App() {
  const locale = ptBr;

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: 'red',
          colorBgBase: '#d3d3d3',
          colorBgLayout: '#d3d3d3',
        },
      }}
    >
      <Content>
        <AppNavigation />
      </Content>
    </ConfigProvider>
  );
}

export default App;
