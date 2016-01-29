var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var libraries = [
  'public/bower_components/angular/angular.min.js',
  'public/bower_components/angular-route/angular-route.min.js'
]

var angular = [
  'public/app/**/*.module.js',
  'public/app/**/*.js'
];

var app = 'server/app.js';

gulp.task('start', function() {
  nodemon({
    script: app,
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.watch(['public/**/.js', 'public/*.html'], ['build']);

gulp.task('sass', function() {
  gulp.src('public/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/app/css'))
});

gulp.task('watch', function() {
  gulp.watch('public/scss/**/*.scss', ['sass']);
});

gulp.task('angular', function() {
  return gulp.src(angular)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('server/public'));
});

gulp.task('views', function() {
  return gulp.src('public/**/*.html')
    .pipe(gulp.dest('server/public'));
});

gulp.task('build', ['angular', 'views', 'concat'], function() {
  return gulp.src(['public/index.html'])
    .pipe(gulp.dest('server/public'));
});

gulp.task('concat', function() {
  return gulp.src(libraries) 
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('server/public'))
});

gulp.task('test', ['build'], function() {
  return gulp.src('server/**/*.spec.js')
    .pipe(mocha());
});

gulp.task('default', ['start', 'sass', 'angular', 'views', 'build', 'concat' , 'test']);