var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssMinifier = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    
gulp.task( 'sass', function() {
    gulp.src( './src/scss/*.scss' )
        .pipe( sass() )
        .pipe( gulp.dest( './src/css' ) );
    
} );

gulp.task( 'minify-css', function() {    
    gulp.src( './src/css/*.css' )
        .pipe( cssMinifier( { keepBreaks: false } ) )
        .pipe( gulp.dest( './dist/' ) );
    
} );
 
gulp.task('scripts', function() {
  return gulp.src('./src/componentes/*.js')
    .pipe(concat('editto.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});
 
gulp.task('minify-js', function() {
  gulp.src('./src/editto.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});