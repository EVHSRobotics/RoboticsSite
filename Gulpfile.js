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
var useref = require('gulp-useref');

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
gulp.task('browser-sync', function() {
    browsersync(CONFIG); 
});

//CLEAN dist 
gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
    .pipe(clean());
});

//HTML 
gulp.task('html', function() {
    return gulp.src('html/front.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({stream: true}));
});

//TEMPLATES 
gulp.task('templates', function() {
    return gulp.src('templates/*.html')
    .pipe(gulp.dest('dist/templates'))
    .pipe(browsersync.reload({stream: true}));
});

//SASS compile concat minify 
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(useref())
    .pipe(rename('style.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({stream: true}));
});

//SCRIPT concat minify 
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
    .pipe(useref())
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({stream: true}));
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
    gulp.watch('templates/*.html', ['templates']);
}); 

//COMPILE 
gulp.task('compile', ['vendor', 'html', 'templates', 'sass', 'scripts']);


//DEFAULT run server 
gulp.task('default', ['clean', 'compile','browser-sync', 'watch']);


