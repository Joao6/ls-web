// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');

// --------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------

var src = 'app';

var output = {
  build: 'public'
};

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function (err) {
  console.log(err);
  this.emit('end');
};

// --------------------------------------------------------------------
// Task: build
// --------------------------------------------------------------------

gulp.task('build', function () {
  return gulp.src(src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(concat(output.build))
    .pipe(gulp.dest('build'));
});

// --------------------------------------------------------------------
// Task: serve
// --------------------------------------------------------------------

gulp.task('serve', ['serve-watch'], function () {

  //watch .scss files
  gulp.watch(src, ['serve-watch']);

  return gulp.src('app')
    .pipe(
    webserver({
      host: '0.0.0.0',
      port: 3000,
      livereload: true,
      open: 'https://localhost:3000',
      https: {
        key: 'https/server.key',
        cert: 'https/server.crt'      
      }
    }));

});



gulp.task('serve-watch', function () {
  return gulp.src(src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat(output.build))
    .pipe(gulp.dest('sample/app/directives/'));
});

