var gulp = require('gulp'),
    foreach = require('gulp-foreach'),
    fs = require("fs"),
    rename = require('gulp-rename'),
    merge = require('merge'),
    handlebars = require('gulp-compile-handlebars'),
    browserSync = require('browser-sync').create(),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    util = require("gulp-util");

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
    gulp.src('src/images/**/*.*')
        .pipe(gulp.dest( config.dist + "/images"));
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

gulp.task('html', gulp.series('scss', function () {
    return gulp.src(['.freecms/**/*.json', '!.freecms/mixins/**/*.*'])
        .pipe(foreach(function (stream, file) {
            var json = JSON.parse(fs.readFileSync(file.path, "utf8"));

            util.log(file.path);

            var mixinsJson = {};

            for (var i = 0; i < json.mixins.length; i++) {
                merge.recursive(mixinsJson, JSON.parse(fs.readFileSync('.freecms/mixins/' + json.mixins[i] + '.json', "utf8")));
            }

            var data = merge.recursive(mixinsJson, json);

            util.log(data.data);

            return gulp.src('templates/pages/' + json.page + '.hbs')
                .pipe(handlebars(data.data, {
                    ignorePartials: true,
                    batch: ['templates/partials']
                }))
                .pipe(rename('index.html'))
                .pipe(gulp.dest(config.dist + json.output));
        }));
}));

gulp.task('build', gulp.parallel('html','scss'));

gulp.task('run', gulp.series('build', function () {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });

    gulp.watch("src/scss/**/*.scss", gulp.series('scss'));
    gulp.watch("src/js/**/*.js", gulp.series('scss'));
    gulp.watch("data/**/*.json", gulp.series('html'));
    gulp.watch("src/pages/**/*.hbs", gulp.series('html'));
    gulp.watch("src/partials/**/*.hbs", gulp.series('html'));

    return new Promise(function(resolve, reject) {
        resolve();
    });
}));

gulp.task('default', gulp.series('run'));