var project = require('./package.json');
var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var transform = require('vinyl-transform');

gulp.task('browserify', function() {

    var browserified = transform(function(filename) {
        var b = browserify(filename, { paths: ['./node_modules', './'], debug : true });
        return b.bundle();
    });

    return gulp.src('./app/index.js')
        .pipe(browserified)
        .pipe(rename(project.name + '.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
    gulp.watch(['./app/**/*.js', './src/**/*.js'], ['browserify']);
});

gulp.task('default', ['browserify']);