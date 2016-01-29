var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var libraries = [
  'public/bower_components/angular/angular.min.js',
  'public/bower_components/angular-route/angular-route.min.js'
  // 'public/bower_components/ngmap/  .min.js'
]

var angular = [
  'client/app/**/*.module.js',
  'client/app/**/*.js'
];

var app = 'server/app.js';

gulp.task('start', function() {
  nodemon({
    script: app,
    }).on('start', ['test']);
});

gulp.watch(['public/**/.js', 'public/*.html'], ['build']);

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

gulp.task('default', ['start', 'angular', 'views', 'build', 'concat' , 'test']);