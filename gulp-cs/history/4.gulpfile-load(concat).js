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

gulp.task('default',function(){
    gulp.src('../app/ceshi/*.js',{base:"../app"})
        .pipe($.concat('all.js'))
        .pipe(
            gulp.dest('../dist-q')
        );
});
