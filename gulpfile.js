const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("docs/*.html").on("change", browserSync.reload);
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
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("docs/sass/**/*.+(sass|scss|css)", gulp.parallel("styles"));
    gulp.watch("docs/*.html").on("change", gulp.parallel('html'));
});

gulp.task('html', function() {
    return gulp.src("docs/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
    return gulp.src("docs/js/**")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function() {
    return gulp.src("docs/fonts/**", { encoding: false })
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function() {
    return gulp.src("docs/icons/**", { encoding: false })
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('mailer', function() {
    return gulp.src("docs/mailer/**/*")
        .pipe(gulp.dest('dist/mailer'));
});

gulp.task('images', function() {
    return gulp.src("docs/img/**", { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'images', 'mailer'));