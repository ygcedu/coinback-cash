import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'index.scss';

console.log('页面刷新了');

ReactDOM.render(
  // fixme: 思考是否需要使用严格模式
  <App/>,
  document.getElementById('root')
);