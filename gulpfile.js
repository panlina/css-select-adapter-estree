var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function () {
	return gulp.src(["./import.js", "./js2html.js", "./html2js.js", "./syntax.js", "./export.js"])
		.pipe(concat('js2html.js'))
		.pipe(gulp.dest('./dist/'));
});
