const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('sass',() => {
    return gulp.src('scss/main.scss')
           .pipe(sass())
           .pipe(gulp.dest('./css'))
});
gulp.task('babel', () => {
    gulp.src('./script.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./js'));
});

gulp.task('default',() => {
    gulp.watch('./script.js',['babel']);
    gulp.watch('scss/main.scss',['sass']);
});

