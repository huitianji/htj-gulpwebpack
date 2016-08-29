var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var minify = require('gulp-minify-css');
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

gulp.task('minify',function(){
    gulp.src('../app/ceshi/less/*.less')
        .pipe($.less())//把less编译成css
        .pipe(gulp.dest('../dist-q'))//输出到目的地
        .pipe(minify())//对css再进行压缩
        .pipe($.rename('all.min.css'))//重命名
        .pipe(
            gulp.dest("../dist-q")//输出到目的地
        )
});

gulp.task('default',['minify']);