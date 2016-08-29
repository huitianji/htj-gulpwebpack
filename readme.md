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

【gulp-第四：watch=监听】

    d:\jihuitian\htj-gulpwebpack\app\js\src.js changed
    d:\jihuitian\htj-gulpwebpack\app\js\src.js deleted
    d:\jihuitian\htj-gulpwebpack\app\js\src.js added

    {
        gulp.watch('../app/**',function(event){
                console.log(event.path,event.type);//d:\jihuitian\htj-gulpwebpack\app\src.js added
                //console.log(path.resolve('app'));//d:\jihuitian\htj-gulpwebpack\gulp-cs\app
                //console.log(path.resolve('app').length);
                //added
                //changed
                //deleted

                switch (event.type){
                    case 'added':
                        //fs.createReadStream(event.path).pipe(
                        //    fs.createWriteStream(
                        //        path.join('../dist-q',
                        //            event.path.slice(path.resolve('../app').length)
                        //        )
                        //    )
                        //);
                        fs.readFile(event.path,function(err,data){
                            //console.log(err,data)
                            fs.writeFile(
                                path.join(
                                    '../dist-q',
                                    event.path.slice(path.resolve('../app').length)
                                )
                            )
                        })
                        break;
                    case 'changed':
                        fs.createReadStream(event.path).pipe(
                            fs.createWriteStream(path.join(
                                '../dist-q',
                                event.path.slice(path.resolve('../app').length)
                            ))
                        );
                        break;
                    case 'deleted':
                        fs.unlink(
                            path.join(
                                '../dist-q',
                                event.path.slice(path.resolve('../app').length)
                            )
                        );
                        break;
                    default:
                        break;
                }

            })
    }


-----------------------【gulp插件----glup-plugins】-------------------------------------------------------------------------------



插件介绍：
    -。- 编译sass:gulp-sass
    -。-编译less:gulp-less
    -。-合并文件 ：gulp-concat
    -。-压缩js文件：gulp-uglify
    -。-重命名js文件：gulp-rename
    -。-优化图像大小：gulp-imagemin
    -。-压缩css 文件：gulp-minify-css
    -。-创建本地服务器：gulp-connect
    -。-实时预览：gulp-connect

    -。-合成雪碧图：gulp-sprite

    --。 html文件压缩:gulp-minify-html     用法：minifyHtml()

    --。 代码检查  gulp-jshint


【安装--gulp-plugins】

 【1】    //gulp-load-plugins这个插件能自动帮你加载package.json文件里面的gulp插件。
   npm install gulp-load-plugins --save-dev

【2】    //合并文件
    npm install gulp-concat --save-dev

【3】    //安装less
    npm install gulp-less --save-dev

【4】   //安装本地服务器
    npm install gulp-connect --save-dev

【5】  //压缩js
   npm install gulp-uglify --save-dev

【6】 //重命名
    npm install gulp-rename --save-dev

【7】 //重命名
    npm install gulp-minify-css --save-dev


【gulp-plugins-第一：】
    var gulp = require("gulp");
    //加载gulp-load-plugins插件，并马上运行它
    var $ = require('gulp-load-plugins')();

【gulp-plugins-第二：《文件合并》】

    gulp.task('default',function(){
        gulp.src('../app/csjs/*.js',{base:"../app"})
            .pipe($.concat('all.js'))
            .pipe(
                gulp.dest('../dist-q')
            );
    });
【gulp-plugins-第三：编译less】

    gulp.task('default',function(){
        gulp.src('../app/ceshi/less/*.less')
            .pipe($.less())
            .pipe(
                gulp.dest('../dist-q/css')
            );
    });

【gulp-plugins-第四：运行本地服务器（gulp-connect）】
    gulp.task('server',function(){
        $.connect.server({
            root:'../dist-q',//服务器的根目录
            port:8080 //服务器的地址，没有此配置项默认也是8080
        });
    });
    gulp.task('default',['server']);//


   目录下会有一个index.html叫索引页。也叫目录页。。会自动加载index.html

【gulp-plugins-第五：文件变动时实时刷新浏览器】
    //**----
    gulp.task('copy-html',function(){
        gulp.src('app/index.html')//指定源文件
            .pipe(gulp.dest('dist'))//拷贝到dist目录
            .pipe(connect.reload());//通知浏览器重启
    });

    gulp.task('watch',function(){
        gulp.watch('app/index.html',['copy-html']);
    });

    gulp.task('server',function(){
        connect.server({
            root:'dist',//服务器的根目录
            port:8080,//服务器的地址，没有此设置项默认也是8080
            livereload:true//启用实时刷新的功能
        });
    });

【gulp-plugins-第六：压缩js】


    gulp.task('uglify',function(){
        return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])
                    .pipe(concat('app.js'))//把多个js文件进行压缩
                    .pipe(ugligy())//对合并后的app.js文件进行压缩
                    .pipe(gulp.dest('dist/js'))//输出目的地
    });
    gulp.task('default',['uglify']);

【gulp-plugins-第七：重命名】

