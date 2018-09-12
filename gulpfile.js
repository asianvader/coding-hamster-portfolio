const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const uglify = (require('gulp-uglify'));

const sassSources = ['styles/*.scss'];
const outputDir = 'assets';
const jsSources = ['scripts/*.js'];
const htmlSources = ['**/*.html'];
const styleWatch = ['scripts/*.scss'];


gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('copy', function() {
  gulp.src('*.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('style', function() {
  gulp.src(sassSources)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }) )
    .on ('error', console.error.bind(console))
    .pipe( autoprefixer ({
      browsers: ['last 2 versions'],
      cascade: false
    }) )
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputDir));
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(rename('script.min.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(outputDir))
});


gulp.task('watch', ['default'], function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['style']);
  gulp.watch(htmlSources, ['copy']);
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: 'assets',
    livereload: true
  })
});

gulp.task('default', [ 'style', 'connect', 'html', 'js']);
