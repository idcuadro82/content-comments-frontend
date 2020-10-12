import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.scss';

const rootNode = document.getElementById('root');
rootNode ? ReactDOM.render(<App />, document.getElementById('root')) : false;
