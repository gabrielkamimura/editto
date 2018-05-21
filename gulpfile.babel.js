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
      destfile = "./editto.min.js";


gulp.task('scripts', () => {
  return gulp.src('./componentes/*.js')
    .pipe(concat('editto.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('theme-compiler', () => {
  gulp.src('./scss/theme-generator/*-theme.scss')
    .pipe(sass())
    .pipe( cssMinifier( { keepBreaks: false } ) )
    .pipe(gulp.dest('./themes'))
});