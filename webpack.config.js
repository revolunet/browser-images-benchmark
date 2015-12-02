module.exports = {
    entry: "./src/index.js",
    contentBase: './src',
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },{
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            }
        ]
    }
};
