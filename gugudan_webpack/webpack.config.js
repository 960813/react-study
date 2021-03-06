const path = require('path');

const webpack = require('webpack');
// entry
// module
// plugins
// output
module.exports = {
    name: 'gugudan-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 실서비스: hidden-source-map
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
                            browsers: ['> 90% in KR', 'last 2 chrome versions'] // browserslist
                        },
                        debug: true
                    }],
                    '@babel/preset-react'
                ],
            },
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],

    output: {
        path: path.join(__dirname, 'dist'), // C:\Users\martin\Documents\projects\react_std\dist
        filename: 'app.js'
    }, // 출력
};