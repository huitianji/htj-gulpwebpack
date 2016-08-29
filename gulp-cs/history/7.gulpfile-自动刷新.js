var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
//load
/*
function load(){
    var devDependencies = JSON.parse(fs.readFileSync('../package.json'));
    var $ = {};
    for(var attr in devDependencies){
        if(attr.indexOf('gulp-') == 0){
            $[attr.slice(5)] = require(attr);
        }
    }
    return $;
}
*/

gulp.task('copy-html',function(){
    gulp.src('../app/index.html')//指定源文件
        .pipe(gulp.dest('../dist-q'))//拷贝到dist目录
        .pipe($.connect.reload());//通知浏览器重启
});

gulp.task('watch',function(){
    gulp.watch('../app/index.html',['copy-html']);
});

gulp.task('server',function(){
    $.connect.server({
        root:'../dist-q',//服务器的根目录
        port:8080,//服务器的地址，没有此设置项默认也是8080
        livereload:true//启用实时刷新的功能
    });
});

gulp.task('default',['server','watch']);