var webpack = require("webpack");
var path = require("path");
module.exports = {
    //entry:"./entry.js",//入口文件  app/js
    entry:{
        bundle:"./entry.js"
        //,
        //bundle2:"./entry2.js"
    },
    output:{
        path:path.resolve(__dirname,'bundjs'),//打包到dist/bundjs文件夹下path.resolve(__dirname,'dist/bundjs')
        filename:"[name].js"
    }
    ,
    module:{//定义模块的加载器
        loaders:[//定义了一系列的加载器
            {test:/\.css$/,loader:'style!css'},
            {test:/\.(jpg|png|gif)$/,loader:'url?limit=40000'},
            {
                test:/\.js?$/,
                loader:"babel-loader",
                exclude:/node_modules/,
                query:{
                    compact:false,
                    presets:['es2015']
                }
            }
        ]
    }
    ,
    plugins:[
        new webpack.BannerPlugin('//jht//'),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ]
    ,
    resolve:{
        alias:{//别名。省略过长的路径
            jquery:"./app/jquery/jquery1.10.2.min.js"
            ,
            jsbox:"./app/js"
        }
    }
}
