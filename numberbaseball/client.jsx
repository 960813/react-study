import React from 'react';
const ReactDom = require('react-dom');

import {hot} from 'react-hot-loader/root';

//import NumberBaseBall from "./NumberBaseBall";
const NumberBaseBall = require('./NumberBaseBall');

const Hot = hot(NumberBaseBall);

ReactDom.render(<Hot />, document.querySelector('#root'));