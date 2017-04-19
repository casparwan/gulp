//引入gulp
var gulp = require('gulp');

//引入组件
var less=require('gulp-less');
var concat=require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./src/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("./src/*.scss")
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest("./dist"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);