'use strict';

var babel = require('gulp-babel');
var browserSync  = require('browser-sync');
var changed = require('gulp-changed');
var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var removeCode = require('gulp-remove-code');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src(config.tasks.js.src)
    .pipe(changed(config.tasks.js.dest))
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(gulpif(process.env.NODE_ENV == 'production', eslint()))
    .pipe(gulpif(process.env.NODE_ENV == 'production', eslint.format()))
    .pipe(babel({presets: ['es2015']}))
    .pipe(removeCode({ production: process.env.NODE_ENV == 'production' }))
    .pipe(gulpif(process.env.NODE_ENV == 'production', uglify()))
    .pipe(gulp.dest(config.tasks.js.dest))
    .pipe(browserSync.stream());
});
