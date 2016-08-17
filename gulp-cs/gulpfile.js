var gulp = require("gulp");
var path = require("path");

gulp.task('copy-js',function(){
    console.log('copy');
});

gulp.task("default",function(){
    gulp.watch('../app/**/*.js',function(event){
        console.log(event.path,event.type);
        //added
        //changed
        //deleted
        switch (event.type){
            case 'added':
                /*
                fs.createReadStream(event.path).pipe(
                    fs.createWriteStream(
                        path.join('dist',
                            event.path.slice(path.resolve('../app').length)
                        )
                    )
                );
               */
                fs.readFile(event.path,function(err,data){
                    fs.writeFile(
                        path.join(
                            'dist',
                            event.path.slice(path.resolve('app').length)
                        )
                    )
                })
                break;
            case 'changed':
                fs.createReadStream(event.path).pipe(
                    fs.createWriteStream(path.join(
                        'dist',
                        event.path.slice(path.resolve('app'))
                    ))
                );
                break;
            case 'deleted':

                break;
            default:
                break;
        }
    })
});
