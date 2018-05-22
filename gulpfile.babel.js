//var gulp = require('gulp'),
//    sass = require('gulp-sass'),
//    cssMinifier = require('gulp-minify-css'),
//    concat = require('gulp-concat'),
//    uglify = require('gulp-uglify');

import gulp from "gulp";
import sass from "gulp-sass";
import cssMinifier from "gulp-minify-css";
import concat from "gulp-concat";
import uglify from "gulp-uglify";

const baseJsFile = "./editto.es6.js",
      babel = require('gulp-babel'),
      destfile = "./editto.min.js";


gulp.task('scripts', () => {
  return gulp.src(baseJsFile)
    .pipe(concat('editto.min.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('components', () => {
  return gulp.src('./components-es6-example/*.js')
    .pipe(concat('example-components.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('theme-compiler', () => {
  gulp.src('./scss/theme-generator/*-theme.scss')
    .pipe(sass())
    .pipe( cssMinifier( { keepBreaks: false } ) )
    .pipe(gulp.dest('./themes'))
});