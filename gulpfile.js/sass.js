// SASS & CSS TASKS
'use strict';

/*
- Watch for _assets SASS changes
- Build SASS
- PostCSS - Minimize
- Copy to _site/css [ _site/assets/css ? ]
- ...
- If 'serve' - browsersync
*/

// Global Requires
const gulp = require('gulp');
const paths = require('./paths.js');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

sass.compiler = require('node-sass');

// Tasks
function buildSass(cb) {
  console.log(`Reading SASS from ${paths.sassFilesGlob}`);
  console.log(`Writing CSS to ${paths.siteCssFiles}`);
  let stream = gulp.src(paths.sassFilesGlob)
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["node_modules"]
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest(paths.siteCssFiles));
  
  if(paths.config.serve) {
    //stream = stream.pipe(browserSync.stream());
    //reload();
  }

  return stream;
}
gulp.task('buildSass', buildSass);

// Watch Tasks
function watchSass(cb) {
  gulp.watch(paths.sassFiles + paths.sassPattern, gulp.series('buildSass', 'deploy'));
}
gulp.task('watchSass', watchSass);