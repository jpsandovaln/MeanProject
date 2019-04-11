const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('connect', function(){
    connect.server({
        root: '',
        port: 4200,
        host: '172.21.19.17',
        livereload: true
    });
});

gulp.task('js', function(){
    browserify('./src/app/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('all.js'))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(connect.reload());   
});

gulp.task('html', function(){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('copy_dependecies_js', function(){
    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-material/angular-material.min.js'
    ])
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload());
});

gulp.task('copy_dependecies_css', function(){
    gulp.src([
        './node_modules/angular-material/angular-material.min.css',
    ])
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('custom_dependecies', function(){
    gulp.src([
        './src/**/*.js',
    ])
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./index.html', ['html']);
});

gulp.task('default', ['js', 'copy_dependecies_js', 'copy_dependecies_css','html', 'connect', 'watch'], function(){
});