const gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass',() => {
    return gulp.src('scss/main.scss')
           .pipe(sass())
           .pipe(gulp.dest('./css'))
});

gulp.task('default',() => {
    gulp.watch('scss/main.scss',['sass']);
});

