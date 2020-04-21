// HTML TASKS
'use strict';

// Global Requires
const gulp = require('gulp');
const gulpif = require('gulp-if');
const paths = require('./paths.js');
const newer = require('gulp-newer');
const uglify = require('gulp-terser');
const useref = require('gulp-useref');

gulp.task('copyPHPFiles', (cb) => {
  console.log(`Copying ${paths.sourceHtmlFilesglob} to ${paths.siteDir}`);
  return gulp.src(paths.sourceHtmlFilesglob/*, { allowEmpty: true }*/)
    .pipe(newer(paths.siteDir))
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest(paths.siteDir));
});

// Watch Tasks
gulp.task('watchHtml', (cb) => {
  console.log(`Watching HTML: ${paths.sourceHtmlFilesglob}`);
  gulp.watch(paths.sourceHtmlFilesglob, gulp.series('copyPHPFiles'));
  cb();
});