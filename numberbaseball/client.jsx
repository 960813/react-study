const React = require('react');
const ReactDom = require('react-dom');

import {hot} from 'react-hot-loader/root';

const NumberBaseBall = require('./NumberBaseBall');
const Hot = hot(NumberBaseBall);

ReactDom.render(<Hot />, document.querySelector('#root'));