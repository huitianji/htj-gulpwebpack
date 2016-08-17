var gulp = require("gulp");
var path = require("path");

/*
//初次尝试gulp---
gulp.task("hello",function(){
    console.log("hello");
});
//依赖
gulp.task("default",['hello'],function(){

});
*/
/*
//gulp--2
gulp.task("default",function(){
    gulp.src('../app/js/people.js',{base:"../app"})
        .pipe(
            gulp.dest('../dist-q')
        );
    //console.log(__dirname)
    //console.log(path.resolve(".."))
});
*/
/*
//gulp-3

gulp.task("default",function(){
    gulp.src('../app\/**\/*.js')
        //有通配符开始出现的那部分路径 ‘**\/*.js'
        .pipe(
            gulp.dest('dist')
        )
});
*/

//gulp-4
//目录APP -{bootstrap| jquery/}
gulp.task("default",function(){
    gulp.src(['../app/**/*.js','!../app/jquery/*.js'],{base:'app'})

        .pipe(
            gulp.dest('dist')
        )
});
