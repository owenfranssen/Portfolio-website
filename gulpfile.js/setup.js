// PROJECT SETUP TASKS
'use strict';

// Global Requires
const gulp = require('gulp');
const paths = require('./paths.js');

const config = {
    "boilerplate": "/home/owen/Websites/Resources/HTML/-Boilerplates/Bootstrap-NPM/",
    "node": "node_modules/"
  }

function setupProject(done) {
  // create structure
  gulp.src(['*.*', '!./gulpfile.js'], {
      read: false
    })
    .pipe(gulp.dest('./'+paths.sourceDir))
    // .pipe(gulp.dest('./'+paths.fontFiles))
    .pipe(gulp.dest('./'+paths.imageFiles))
    // .pipe(gulp.dest('./'+paths.jsFiles))
    // .pipe(gulp.dest('./'+paths.sassFiles))
    .pipe(gulp.dest('./'+paths.tempDir))
    .pipe(gulp.dest('./'+paths.siteDir));

  // copy sources
  // JS - included in index.html from ./node_modules/
  // gulp.src(config.node + 'bootstrap/dist/js/bootstrap.js')
  //   .pipe(gulp.dest('./'+paths.jsFiles + 'vendor'));
  // gulp.src(config.node + 'popper.js/dist/popper.js')
  //   .pipe(gulp.dest('./'+paths.jsFiles + 'vendor'));
  // gulp.src(config.node + 'jquery/dist/jquery.js')
  //   .pipe(gulp.dest('./'+paths.jsFiles + 'vendor'));

  // SCSS
  gulp.src(config.boilerplate + 'scss/*.scss')
    .pipe(gulp.dest('./'+paths.sassFiles));
  gulp.src(config.boilerplate + 'scss/bootstrap/*.scss')
    .pipe(gulp.dest('./'+paths.sassFiles + 'bootstrap'));
  // gulp.src(config.node + '@fortawesome/fontawesome-free/scss/*.scss')
  //   .pipe(gulp.dest('./'+paths.sassFiles + 'vendor/fontawesome'));
  gulp.src(config.node + 'include-media/dist/*.scss')
    .pipe(gulp.dest('./'+paths.sassFiles + 'vendor'));

  // Fonts
  gulp.src(config.node + '@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('./'+paths.fontFiles))
    .pipe(gulp.dest('./'+paths.siteFontFiles));

  // CREATE/COPY index.html
  gulp.src(config.boilerplate + 'index.html')
    .pipe(gulp.dest('./'+paths.sourceDir));
  gulp.src(config.boilerplate + 'js/site.js')
    .pipe(gulp.dest('./'+paths.jsFiles));

  done();
}
gulp.task('setupProject', setupProject);