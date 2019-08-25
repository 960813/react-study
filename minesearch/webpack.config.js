const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'tictactoe-setting',
    mode: 'production', // 실서비스: production 개발 : development
    devtool: 'hidden-source-map', // 실서비스: hidden-source-map 개발 : eval
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry:{
        app: [
            './client'
        ],
    }, // 입력

    module:{
        rules:[{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'] // browserslist
                        },
                        debug: true
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            },
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],

    output: {
        path: path.join(__dirname, 'dist'), // C:\Users\martin\Documents\projects\react_std\dist
        filename: 'app.js',
        publicPath: '/dist' // app.use('/dist', express.static(__dirname,'dist'))
    }, // 출력
};