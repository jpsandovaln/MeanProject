import path from 'path';
import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import cache from 'gulp-cached';
import obfuscator from 'gulp-javascript-obfuscator';

const JS_SOURCES = ['src/**/*.js'];
const TARGET_DIR = 'build';
const INDEX = path.join(TARGET_DIR, 'index.js');

gulp.task('clean', () => {
    return gulp.src(TARGET_DIR, { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('obfuscate', () => {
    return gulp
    .src(JS_SOURCES)
    .pipe(
        babel({
            presets: ['@babel/preset-env']
        })
    )
    .pipe(
        obfuscator({
            compact: true
        })
    )
    .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('transpile', () => {
    return gulp
    .src(JS_SOURCES)
    .pipe(cache('transpile'))
    .pipe(
        babel({
            presets: ['@babel/preset-env']
        })
    )
    .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('nodemon', (done) => {
    return nodemon({
        script: INDEX,
        watch: TARGET_DIR,
        env: { NODE_ENV: 'development' },
        done
    });
});

gulp.task('watch', () => {
    gulp.watch(JS_SOURCES, gulp.series('transpile'));
});

gulp.task('lint', () => {
    return gulp
    .src(JS_SOURCES)
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', gulp.series('obfuscate'));

gulp.task('start', gulp.series('transpile', gulp.parallel('watch', 'nodemon')));

gulp.task('default', gulp.series('start'));
