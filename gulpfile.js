
var gulp = require('gulp');

var webpack = require('gulp-webpack');

var sass = require('gulp-sass');

var cssmin = require('gulp-cssmin');

var rename = require('gulp-rename');

var uglify = require('gulp-uglify');



gulp.task('build:js',function(){
	return gulp.src('./src/js/index.js')
			.pipe(webpack({
			}))
			.pipe(rename('mdialog.js'))
			.pipe(gulp.dest('./dest/'))
});

gulp.task('min:build:js',['build:js'],function(){
	return gulp.src('./dest/mdialog.js')
			.pipe(uglify())
			.pipe(rename('mdialog.min.js'))
			.pipe(gulp.dest('./dest/'))
});

gulp.task('build:sass',function(){
	return gulp.src('./src/sass/**/*.scss')
			.pipe(sass())
			.pipe(rename('mdialog.css'))
			.pipe(gulp.dest('./dest/'));
});

gulp.task('min:build:sass',['build:sass'],function(){
	return gulp.src('./dest/mdialog.css')
			.pipe(cssmin())
			.pipe(rename('mdialog.min.css'))
			.pipe(gulp.dest('./dest/'))
});

gulp.task('watch:js',function(){
	return gulp.watch('./src/js/**/*.js',['build:js']);
});

// gulp.task('watch:sass',function(){
// 	return gulp.watch('src/sass/**/*.scss',['build:sass']);
// });

gulp.task('default',['build:js','min:build:js','build:sass','min:build:sass'])
//gulp.task('default',['build-js','build-sass'])