const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("docs/sass/**/*.+(sass|scss)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("docs/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("docs/sass/**/*.+(sass|scss)", gulp.parallel("styles"));
    gulp.watch("docs/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));