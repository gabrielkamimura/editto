var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssMinifier = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    
gulp.task( 'sass', function() {
    gulp.src( './scss/*.scss' )
        .pipe( sass() )
        .pipe( gulp.dest( './css' ) );
    
} );

gulp.task( 'minify-css', function() {    
    gulp.src( './css/*.css' )
        .pipe( cssMinifier( { keepBreaks: false } ) )
        .pipe( gulp.dest( './dist/' ) );
    
} );
 
gulp.task('scripts', function() {
  return gulp.src('./componentes/*.js')
    .pipe(concat('editto.js'))
    .pipe(gulp.dest('./'));
});
 
gulp.task('minify-js', function() {
  gulp.src('./editto.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('theme-compiler', function() {
  gulp.src('./scss/theme-generator/*-theme.scss')
    .pipe(sass())
    .pipe(gulp.dest('./themes'))
});