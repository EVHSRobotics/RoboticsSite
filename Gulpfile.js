////////////////
//GULP SCRIPTS//
////////////////

//////////
//CONFIG//
//////////

//vendor
var VENDORS = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/fontawesome/css/font-awesome.min.css',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/moment/min/moment.min.js',
  'bower_components/headroom.js/dist/headroom.min.js',
  'bower_components/headroom.js/dist/angular.headroom.min.js',
  'bower_components/angular-ui-utils/ui-utils.min.js'
];

//browser-sync
var CONFIG = {
  server: {
    baseDir: 'dist',
  },
  port: 1212
};


//GULP
var gulp = require('gulp');

///////////
//PLUGINS//
///////////

//node
var fs = require('fs');
var path = require('path');

//hint
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
var jsonEditor = require('gulp-json-editor');
var merge = require('merge-stream');
var browsersync = require('browser-sync');

//////////////////
//File Structure//
//////////////////

//File Array in directory
var fileArray = function(dir) {
  return fs.readdirSync(dir).map(function(element) {
    return './' + dir + '/' + element;
  });
};

/////////
//TASKS//
/////////

//BROWSER-SYNC tasks
gulp.task('bs', ['compile'], function() {
  browsersync(CONFIG);
});

//CLEAN dist
gulp.task('clean', function() {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});

//HTML
gulp.task('html', function() {
  return gulp.src('html/front.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//TEMPLATES
gulp.task('templates', function() {
  return gulp.src('templates/*.html')
    .pipe(gulp.dest('dist/templates'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//ASSETS
gulp.task('assets', function() {
  return gulp.src('assets/**')
    .pipe(gulp.dest('dist/assets'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//DATA
gulp.task('data', function() {
  return gulp.src('data/**')
    .pipe(gulp.dest('dist/data'))
    .pipe(browsersync.reload({
      stream: true
    }));
});


//Data Blog Array
gulp.task('dataBlogArray', ['data'], function() {
  var blogPostArray = [];
  //MAKE THIS COME FROM THE CONFIG FILE
  fileArray('data/data_god_blog').map(function(element) {
    var data = require(element);
    blogPostArray.unshift({
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date
    });
  });
  return gulp.src('data/godBlogPostArray.json')
    .pipe(jsonEditor(function(json) {
      return blogPostArray;
    }))
    .pipe(gulp.dest('dist/data'));
});

//SASS compile minify
gulp.task('scss', function() {
  return gulp.src('scss/front.scss')
    .pipe(rename('style.min.css'))
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//SCRIPT concat minify
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//VENDOR
gulp.task('vendor', function() {
  return gulp.src(VENDORS)
    .pipe(gulp.dest('dist/vendor'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//WATCH changes
gulp.task('watch', ['compile'], function() {
  gulp.watch('html/*.html', ['html']);
  gulp.watch('templates/*.html', ['templates']);
  gulp.watch('assets/**', ['assets']);
  gulp.watch('data/**', ['data', 'dataBlogArray']);
  gulp.watch('config/**', ['config']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['scss']);

});

//COMPILE
gulp.task('compile', ['vendor', 'html', 'templates', 'assets', 'data', 'dataBlogArray', 'scss', 'scripts']);

///////
//DEV//
///////

//SCRIPT concat without minify
gulp.task('scripts-D', function() {
  return gulp.src('js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

//GHPAGES
gulp.task('ghpages', function() {
  return gulp.src('dist/**')
    .pipe(gulp.dest('../RoboticsSiteGhpages'));
});


//DEFAULT run server
gulp.task('default', ['compile', 'bs', 'watch']);
