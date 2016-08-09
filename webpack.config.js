var webpack = require("webpack");
var path = require("path");
module.exports = {
    entry:"./entry.js",//入口文件  app/js
    output:{
        path:path.resolve(__dirname,'bundjs'),//打包到dist/bundjs文件夹下path.resolve(__dirname,'dist/bundjs')
        filename:"bundle.js"
    }
    ,
    module:{//定义模块的加载器
        loaders:[//定义了一系列的加载器
            {test:/\.css$/,loader:'style!css'},
            {test:/\.(jpg|png|gif)$/,loader:'url?limit=40000'}
        ]
    }
    ,
    plugins:[
        new webpack.BannerPlugin('//jht//')
    ]
    ,
    resolve:{
        alias:{
            jquery:"./app/jquery/jquery1.10.2.min.js"
        }
    }
}
