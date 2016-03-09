'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    runSequence = require('run-sequence');
    
var config = {
  release: './dist'
};

gulp.task('serve-static', function () {
  gulp.src('.')
    .pipe(webserver({
      https: true,
      port: '8443',
      host: 'localhost',
      directoryListing: false,
      fallback: 'index.html'
    }));
});

gulp.task('dist-remove', function () {
  return del(config.release);
});

gulp.task('dist-copy-files', function() {
  return gulp.src([
    './css/**/*',
    './js/**/*',
    './fonts/**/*',
    './*.html'
  ], { base: './' }).pipe(gulp.dest(config.release));
});

gulp.task('dist', function () {
  runSequence(
    ['dist-remove'],
    ['dist-copy-files']
    );
});

gulp.task("copyCSS", function(){
   return gulp.src("bower_components/bootstrap/dist/css/bootstrap.min.css")
   .pipe(gulp.dest("css") )
});

gulp.task("copyFonts", function(){
   return gulp.src("bower_components/bootstrap/dist/fonts/*")
   .pipe(gulp.dest("fonts") )
});

gulp.task("copyJS", function(){
   return gulp.src(["bower_components/bootstrap/dist/js/bootstrap.min.js",
   "bower_components/jquery/dist/jquery.min.js"])
   .pipe(gulp.dest("js") )
});

gulp.task("copyVendorStuff", ["copyCSS", "copyFonts", "copyJS"]);