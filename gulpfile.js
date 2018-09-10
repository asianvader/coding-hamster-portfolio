const gulp = require('gulp'),
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      connect = require('gulp-connect'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer');

      // autoprefixer = require('gulp-autoprefixer');

const jsSources = ['scripts/*.js'],
      sassSources = ['styles/*.scss'],
      htmlSources = ['**/*.html'],
      outputDir = 'assets';

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('copy', function() {
  gulp.src('*.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass(
//    { outputStyle: 'compressed' }
  )
)
  // https://web-design-weekly.com/2014/06/15/different-sass-output-styles/
  // nested:compact:expanded:compressed
  .pipe(sourcemaps.init())
  //.pipe(autoprefixer(
    // optional settings
    // {
	 	// 	browsers: ['last 2 versions'],
	 	// 	cascade: false
	 	// }
  //))
  //.pipe(concat('main.css'))
  .pipe(sourcemaps.write('.'))
  .on('error', gutil.log)
  .pipe(gulp.dest(outputDir))
});

// gulp.task('autoprefixer', function() {
//   gulp.src('assets/*.css')
//
//   .on('error', gutil.log)
//   .pipe(gulp.dest(outputDir))
// });

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(uglify())
  .pipe(concat('script.min.js'))
  .pipe(gulp.dest(outputDir))
  .on('error', gutil.log)
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
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

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);
