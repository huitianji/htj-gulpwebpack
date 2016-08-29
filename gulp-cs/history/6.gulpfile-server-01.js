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

gulp.task('server',function(){
    $.connect.server({
        root:'../dist-q',//服务器的根目录
        port:8080 //服务器的地址，没有此配置项默认也是8080
    });
});
gulp.task('default',['server']);//
