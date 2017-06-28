var gulp = require('gulp'); 
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

// var bases = {
// 	app : 'app/',
// 	countries: 'app/countries/',
// 	countryDetail: 'app/countryDetail/',
// }

var paths = {
  scripts: [ 
    './js/**/*.js', 
    '!public/bower_components/**/*.js',
  ],
  html: [
    './public/**/*.html',
    '!./public/index.html'
    //,'!./public/bower_components/**/*.html'
  ],
  images: ['./public/img/**/*'],
  index: './public/index.html',
  build: './build/'
}
/* 1 */
gulp.task('clean', function(){
  gulp.src( paths.build, { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src( paths.html )
    .pipe(gulp.dest('build/'));

  gulp.src( paths.images )
  	.pipe(gulp.dest(paths.build + 'img/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( 'build/' ))
});

gulp.task('build', ['usemin']);

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'build/'
  });
});

gulp.task('default', ['connect']);