var gulp = require("gulp");
var path = require("path");
var fs = require("fs");

gulp.task('copy-js',function(){
    console.log('copy');
});

gulp.task("default",function(){

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
});
