//CONFIG 
//vendor 
var VENDORS = [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/fontawesome/css/font-awesome.min.css',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/moment/min/moment.min.js'
];

//browser-sync 
var CONFIG = {
    server: {
        baseDir: 'dist',
        routes: {
            //"./vendor": "../vendor"
        }
    },
    port: 1212
};


//GULP 
var gulp = require('gulp');

//GULP PLUGINS 

var jshint = require('gulp-jshint');

//concatenate
var concat = require('gulp-concat');

//sass 
var sass = require('gulp-sass');
var csso = require('gulp-csso');

//scripts 
var uglify = require('gulp-uglify');

//util 
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var clean = require('gulp-clean');
var util = require('gulp-util');
var browsersync = require('browser-sync');

//BROWSER-SYNC tasks 
gulp.task('browser-sync', function () {
    browsersync(CONFIG);
});

//CLEAN dist 
gulp.task('clean', function () {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});

//HTML 
gulp.task('html', function () {
    return gulp.src('html/front.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//TEMPLATES 
gulp.task('templates', function () {
    return gulp.src('templates/*.html')
        .pipe(gulp.dest('dist/templates'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//ASSETS 
gulp.task('assets', function () {
    return gulp.src('assets/**')
        .pipe(gulp.dest('dist/assets'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//DATA 
gulp.task('data', function () {
    return gulp.src('data/**')
        .pipe(gulp.dest('dist/data'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//CONFIG 
gulp.task('config', function () {
    return gulp.src('config/**')
        .pipe(gulp.dest('dist/config'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//SASS compile minify 
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(rename('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//SCRIPT concat minify 
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//VENDOR  
gulp.task('vendor', function () {
    return gulp.src(VENDORS)
        .pipe(gulp.dest('dist/vendor'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

//WATCH changes 
gulp.task('watch', function () {
    gulp.watch('html/*.html', ['html']);
    gulp.watch('templates/*.html', ['templates']);
    gulp.watch('assets/**', ['assets']);
    gulp.watch('data/**', ['data']);
    gulp.watch('config/**', ['config']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['sass']);

});

//COMPILE 
gulp.task('compile', ['vendor', 'html', 'templates', 'assets', 'data', 'config', 'sass', 'scripts']);

//GHPAGES 
gulp.task('ghpages', function () {
    return gulp.src('dist/**')
        .pipe(gulp.dest('../RoboticsSiteGhpages'));
});


//DEFAULT run server 
gulp.task('default', ['compile', 'browser-sync', 'watch']);