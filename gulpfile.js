var concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task('sass', function () {
	  return gulp.src('./assets/scss/style.scss')
    	.pipe(sass.sync().on('error', sass.logError))
    	.pipe(gulp.dest('./assets/css'));
});

gulp.task('concat', function(){
    return gulp.src('./assets/js/**/*.js')
        .pipe(concat('./all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function () {
  gulp.watch('./assets/scss/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['concat']);
});
gulp.task('default', ['sass', 'concat', 'watch']);
