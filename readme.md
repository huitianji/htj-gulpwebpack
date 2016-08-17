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
    <10>
        npm install gulp --save-dev


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

【第10：gulp】
    var gulp = require("gulp");
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    gulp.task('webpack',function(callback){
        var myConfig = Object.create(webpackConfig);
        webpack(
            myConfig,
            function(err,stats){
                callback();
            }

        );
    });
    gulp.task('default',function(){
        gulp.watch('./**',['webpack']);
    });

【webpack-dev-server】
    npm install webpack-dev-server -g



----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////
-----------------------------------【gulp】---------------------------------------------

【gulp-第一：】
    gulp hello
    gulp后面跟着的是任务的名称，不输入任务名称的话会默认找default任务，找不到会报错
【gulp-第二：】
    如果没有默认的default
    可以这么用：gulp --gulpfile  gulpfile.js   或者    gulp --sulpfile  history/gulpfile.js
    如果gulpfile.js 在history下面   ：    gulp hello --cwd history
    cwd 指定当前工作目录
    {
        gulp -T hello
         -T 或者 --tasks 会显示所指定的gulpfile的tasks依赖树
     }
【gulp-第三：】
    {
        var File = require('vinyl');

        var coffeeFile = new File({
            cwd: "/",//当前工作路径
            base: "/test/",//基准路径
            path: "/test/file.coffee",// 文件的完整绝对路径
            contents: new Buffer("test = 123")//文件的内容
        });
    }

    {
        gulp.task("default",function(){
            gulp.src('../app/js/people.js',{base:"../app"})
                .pipe(
                    gulp.dest('../dist-q')
                );
            //console.log(__dirname)
            //console.log(path.resolve(".."))
        });
    }

    gulp.src(['../app/js/people.js'],{base:"../app"})

    【glob语法】---
    -----
    下面我们重点说说Gulp用到的glob的匹配规则以及一些文件匹配技巧。
    Gulp内部使用了node-glob模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符来匹配我们想要的文件：

    * 匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
    ** 匹配路径中的0个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。
    ? 匹配文件路径中的一个字符(不会匹配路径分隔符)
    [...] 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则表达式中的用法
    !(pattern|pattern|pattern) 匹配任何与括号中给定的任一模式都不匹配的
    ?(pattern|pattern|pattern) 匹配括号中给定的任一模式0次或1次，类似于js正则中的(pattern|pattern|pattern)?
    +(pattern|pattern|pattern) 匹配括号中给定的任一模式至少1次，类似于js正则中的(pattern|pattern|pattern)+
    *(pattern|pattern|pattern) 匹配括号中给定的任一模式0次或多次，类似于js正则中的(pattern|pattern|pattern)*
    @(pattern|pattern|pattern) 匹配括号中给定的任一模式1次，类似于js正则中的(pattern|pattern|pattern)

    下面以一系列例子来加深理解

    * 能匹配 a.js,x.y,abc,abc/,但不能匹配a/b.js
    *.* 能匹配 a.js,style.css,a.b,x.y
    */*/*.js 能匹配 a/b/c.js,x/y/z.js,不能匹配a/b.js,a/b/c/d.js
    ** 能匹配 abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件
    **/*.js 能匹配 foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js
    a/**/z 能匹配 a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z
    a/**b/z 能匹配 a/b/z,a/sb/z,但不能匹配a/x/sb/z,因为只有单**单独出现才能匹配多级目录
    ?.js 能匹配 a.js,b.js,c.js
    a?? 能匹配 a.b,abc,但不能匹配ab/,因为它不会匹配路径分隔符
    [xyz].js 只能匹配 x.js,y.js,z.js,不会匹配xy.js,xyz.js等,整个中括号只代表一个字符
    [^xyz].js 能匹配 a.js,b.js,c.js等,不能匹配x.js,y.js,z.js
    当有多种匹配模式时可以使用数组

    //使用数组的方式来匹配多种文件
    gulp.src(['js/*.js','css/*.css','*.html'])
    -----

【gulp-第四：】

    d:\jihuitian\htj-gulpwebpack\app\js\src.js changed
    d:\jihuitian\htj-gulpwebpack\app\js\src.js deleted
    d:\jihuitian\htj-gulpwebpack\app\js\src.js added




















