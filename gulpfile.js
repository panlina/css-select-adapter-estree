var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function () {
	return gulp.src(["./js2html.js", "./html2js.js", "./syntax.js"])
		.pipe(concat('js2html.js'))
		.pipe(gulp.dest('./dist/'));
});
