module.exports = {
    entry: ['/client'],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    mode:'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets:[
                        '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
              },
        ]
    },
}
