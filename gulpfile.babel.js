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

const baseJsFile = "./*.js",
      babel = require('gulp-babel'),
      destfile = "./editto.min.js";


gulp.task('scripts', () => {
    gulp.src('./components/*.js')
        .pipe(concat('editto-bundle.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
    
    return gulp.src('./components/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
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