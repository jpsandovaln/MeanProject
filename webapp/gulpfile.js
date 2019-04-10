const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('default', function(){
    connect.server({
        root: '',
        port: 4001,
        host: '172.21.19.17'
    });
});