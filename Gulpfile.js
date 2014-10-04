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


//GULP 
var gulp = require('gulp');

//GULP PLUGINS 

var jshint = require('gulp-jshint');

    //sass 
var sass = require('gulp-sass');
var concatcss = require('gulp-concat-css');
var minfycss = require('gulp-minify-css');

    //scripts 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

    //util 
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var clean = require('gulp-clean');
var util = require('gulp-util');


//CLEAN dist 
gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
    .pipe(clean());
});

//HTML 
gulp.task('html', function() {
    return gulp.src('html/front.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/main'));
});

//SASS compile & minify 
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(concatcss('style.min.css'))
    .pipe(minfycss())
    .pipe(gulp.dest('dist/main'));
});

//SCRIPT minify 
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/main'));
});

//VENDOR  
gulp.task('vendor', function() {
    return gulp.src(VENDORS)
    .pipe(gulp.dest('dist/vendor'));
});

//WATCH changes 
gulp.task('watch', function() {
    gulp.watch('html/*.html', ['html']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['sass']);
}); 

//DEFAULT 
gulp.task('default', ['html', 'sass', 'scripts', 'watch']);

