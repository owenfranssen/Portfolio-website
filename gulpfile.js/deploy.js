// FTP TASKS
'use strict';

// Requires
const gulp = require('gulp');
//const newer = require("gulp-newer");
//const rsync = require('gulp-rsync');
const ftp = require('vinyl-ftp');
const ftpSettings = require('../.vscode/sftp.json');
const paths = require('./paths.js');
let conn = false;
//const ftpSettings = conf; //paths.config.env == 'dev' ? conf.profiles.dev : conf.profiles.live;

function getFtpConnection() {
  return ftp.create({
    host: ftpSettings.host,
    port: ftpSettings.port,
    user: ftpSettings.username,
    password: ftpSettings.password,
    parallel: 5,
    log: console.log
  });
}

gulp.task('deploy', function (cb) {
  if(paths.config.upload) {
    if (!conn) conn = getFtpConnection();

    console.log(`Deploying changed files from ${paths.siteDir} to ${ftpSettings.remotePath}`);
    return gulp
      .src(`${paths.siteDir}/**/*`, {
        base: paths.siteDir,
        buffer: false
      })
      .pipe(conn.newer(ftpSettings.remotePath))
      .pipe(conn.dest(ftpSettings.remotePath));
  } else {
    console.log("FTP disabled");
    cb();
  }
});

// function rsync-deploy(cb) {
//   return gulp.src(`${paths.siteDir}/**`)
//     .pipe(rsync({
//       root: paths.siteDir,
//       username: ftpSettings.username,
//       password: ftpSettings.password,
//       hostname: ftpSettings.host,
//       destination: ftpSettings.remotePath,
//       compress: true,
//       incremental: true,
//       dryrun: true
//     }));
// }
// gulp.task('deploy', deploy);

function watchFTP() {
  gulp.watch(paths.siteDir + '**/*', gulp.series('deploy'));
}
gulp.task('watchFTP', watchFTP);