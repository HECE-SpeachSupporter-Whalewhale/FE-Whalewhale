import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ViewMemoriesPagePc from './screen/pc/ViewMemoriesPagePc'; // 경로가 정확한지 확인하세요
import { BrowserRouter as Router } from 'react-router-dom'; // Router 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
   <Router>
      <ViewMemoriesPagePc />  </Router>
   
  </React.StrictMode>
  
);



reportWebVitals();
