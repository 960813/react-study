const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

import MinSearch from './MinSearch';

const Hot = hot(MinSearch);

ReactDom.render(<Hot />, document.querySelector('#root'));