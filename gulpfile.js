var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass');

var config = {
    dist: "dist"
}

gulp.task('copy', function () {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest(config.dist + "/js"));
    gulp.src('src/css/*.css')
        .pipe(gulp.dest( config.dist + "/css"));
    gulp.src('src/webfonts/*.*')
        .pipe(gulp.dest( config.dist + "/webfonts"));
        gulp.src('src/fonts/*.*')
            .pipe(gulp.dest( config.dist + "/fonts"));
    gulp.src('src/images/*.*')
        .pipe(gulp.dest( config.dist + "/images"));
        gulp.src('src/*.*')
            .pipe(gulp.dest( config.dist + "/"));
    return new Promise(function(resolve, reject) {
        resolve();
    });
});

gulp.task('scss', gulp.series('copy', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(browserSync.stream());
}));

gulp.task('build', gulp.parallel('scss'));

gulp.task('run', gulp.series('build', function () {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });

    gulp.watch("src/scss/**/*.scss", gulp.series('scss'));
    gulp.watch("src/js/**/*.js", gulp.series('scss'));
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
    gulp.watch("dist/**/*.js").on('change', browserSync.reload);
    gulp.watch("dist/**/*.css").on('change', browserSync.reload);

    return new Promise(function(resolve, reject) {
        resolve();
    });
}));

gulp.task('default', gulp.series('run'));