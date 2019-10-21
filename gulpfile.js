'use strict';

const   gulp            = require('gulp'),
        pug             = require('gulp-pug'),
        csso            = require('gulp-csso'),
        autoprefixer    = require('gulp-autoprefixer'),
        sourcemaps      = require('gulp-sourcemaps'),
        browserSync     = require('browser-sync').create(),
        scss            = require('gulp-sass');


gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
});



gulp.task('pug', function () {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({
            stream: true
        }));
});





gulp.task('scss-dev', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
    // to add more files just import them from main.scss
        .pipe(scss({}))
        .pipe(autoprefixer({
            overrideBrowserlist: ['>0.1%'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('scss', function () {
    return gulp.src('src/scss/main.scss')
        // to add more files just import them from main.scss
        .pipe(scss({}))
        .pipe(autoprefixer({
            overrideBrowserlist: ['>0.1%'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('build/css'));
});



gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});




gulp.task('img', function () {
    return gulp.src('src/img/*.{png,jpg,gif}')
        // use tinypng for images minify
        .pipe(gulp.dest('build/img/'));
});
gulp.task('img-dev', function () {
    return gulp.src('src/img/*.{png,jpg,gif}')
        .pipe(gulp.dest('build/img/'));
});


gulp.task('watch', function () {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/scss/**/*.scss', gulp.series('scss-dev'));
    gulp.watch('src/img/*.*', gulp.series('img-dev'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'))
});



gulp.task('develop', gulp.series(gulp.parallel('pug', 'scss-dev', 'scripts', 'img-dev'),gulp.parallel('watch','serve')));
gulp.task('build', gulp.series(gulp.parallel('pug', 'scss', 'scripts', 'img')));