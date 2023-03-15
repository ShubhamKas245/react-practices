
var path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Todo: Explain why we have use old js for export

module.exports={
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js"
    },   
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:"babel-loader",
            },
            {
                test:/\.scss?$/,
                exclude:/node_modules/,
                // sequence should be very important
                use:["style-loader","css-loader","postcss-loader","sass-loader"],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
      template:"./public/index.html",
      filename:"index.html",
    })],
    resolve: {
        extensions:['.js', '.jsx','.json']
    },
    mode:"development",
    devServer:{
        port:3004,
        open:true,
    }
}