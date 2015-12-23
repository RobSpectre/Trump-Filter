var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var spawn = require('child_process').spawn;

gulp.task('autoreload', function() {
  var process;

  function restart() {
    if (process) {
      process.kill();
    }
    process = spawn('gulp', ['default'], {stdio: 'inherit'});
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});


/* Watch Files For Changes */
gulp.task('watch', function() {
  gulp.watch('./assets/css/**').on('change', livereload.changed);
  gulp.watch('./assets/images/**').on('change', livereload.changed);
  gulp.watch('./assets/js/**').on('change', livereload.changed);
  gulp.watch('*.html').on('change', livereload.changed);
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'serve']);
