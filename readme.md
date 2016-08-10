echo "# htj-gulpwebpack" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/huitianji/htj-gulpwebpack.git
git push -u origin master

///////////////////////////////////////////////////////////////

【准备工作】：
      清除npm cache
      sudo npm cache clean -f

【安装模块】:
    <1>
        npm install webpack -g
        npm install webpack --save-dev
    <2>
        npm install css-loader style-loader --save-dev
    <5>
        npm install url-loader --save-dev
    <7>
        npm install expose-loader --save-dev
    <8>
        npm install babel-core --save-dev
        npm install babel-loader --save-dev
        npm install babel-preset-es2015  --save-dev

【第一：开始工作--初次尝试】

    index.html  entry.js  ---> bundle.js


【第二：加载css文件】：安装加载器loader

    entry.js --> require('!style!css!./style.css');//css ->css-loader

【第三：配置文件】   webpack.config.js

    module.exports = {
        entry:"entry.js",
        output:{
            path:__dirname,//定义了输出的文件夹
            filename:'bundle.js'//定义了打包文件的名称
        },
        module:{//定义了模块的加载逻辑
            loaders:[//定义了一系列的加载器
                {test:/\.css$/,loader:'style!css'}//当需要加载的文件匹配 ‘test’正则时，就会调用后面的‘loader’对文件进行加载
            ]
        }
    }

【第四：插件】
    var webpack = require("webpack");
    plugins:[
        new webpack.BannerPlugin('this is create htj');
    ]
【第五：图片加载】

    url-loader 会将样式中引用到的图片转换为模块来处理
    {test:/\.(jpg|png|gif)/,loader:'url?limit=4000'}//小于4k内联。大于4K外链

【第六:别名】 别名的作用是把用户的一个请求重定向到另一个路径
    resolve:{
        alias:{
            jquery:"../js/jquery"
        }
    }
【第七：expose】
    如果想在前台使用打包的jquery暴露出来，
    把$作为别名为jquery的变量暴露在全局上下文中

    require('expose?$!jquery');

【第八：es6】
    {
        test:/\.js?$/,
        loader:"babel-loader",
        exclude:/node_modules/,
        query:{
            compact:false,
            presets:['es2015']
        }
    }
【第九：公共模块】
    plugins:[
        new webpack.optimize.CommonsChunkPlugin("common.js")
    ]