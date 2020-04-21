'use strict';

// Global Requires
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const browserSync = require('browser-sync').create();

// Project Configuration
const paths = require('./paths.js');

let browser = false;

// Gulpfile Sub-Sections
const css = require('./sass.js');
const deploy = require('./deploy.js');
const html = require('./html.js');
//const images = require('./images.js');
const javascript = require('./javascript.js');
const setup = require('./setup.js');

// Global Tasks
function reload() {
  if(paths.config.serve && browser) {
    browserSync.reload();
  }
  return;
}
gulp.task('reload', reload);

function serve() {
  if(paths.config.serve && !browser) {
    // -- Local BrowserSync --
    // browserSync.init({
    //   injectChanges: true,
    //   watch: true,
    //   server: {
    //     baseDir: "_site"
    //   }
    // });
    console.log("BrowserSync with Remote Proxy");
    browserSync.init({
      watch: true,
      files: [paths.siteDir + '**'],
      serveStatic: [], // paths.siteDir
      proxy: paths.config.remote
    }, () => {
      //localurl = browserSync.getOption('urls').get('external');
      //writeSettings('localurl', localurl);
    });
    browser = true;
  } else {
    console.log('BrowserSync not enabled');
  }
  return;
}
gulp.task('serve', serve);

gulp.task('info', (cb) => {
  console.log("* gulp [watch] --serve true to start BrowserSync --upload true to FTP changes");
  console.log("* gulp watch [--serve true] to rebuild on save");
  console.log("* gulp deploy to upload changes via FTP");
});

gulp.task('setup', gulp.series('setupProject', 'buildSass'));

gulp.task('log', (cb) => {
  //console.log('Test...');
  console.log(`Environment ${paths.config.env} - BrowserSync: ${paths.config.serve}`);
  console.log(`Site source ${paths.sourceDir}`);
  console.log(`Site destination ${paths.siteDir}`);
  cb();
});
gulp.task('test', gulp.series('log', 'serve'));

// gulp [watch|build|buildHtml] --serve true if browsersync required
gulp.task('watch', gulp.series(gulp.parallel('serve', 'watchJs', 'watchHtml', 'watchSass'))); // gulp watch --serve true if browsersync required

gulp.task('default', gulp.series('watch'));