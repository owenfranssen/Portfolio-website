// IMAGE TASKS
'use strict';

/*
- Watch for _images changes
- Optimize 'newer' images to _site/images
- Watch for _images/posts changes
- Generate size variations copy to _site/images/posts
- If 'serve' - browsersync
*/

// Global Requires
const gulp = require('gulp');
const paths = require('paths.js');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const webp = require('imagemin-webp');
const flatMap = require('flat-map').default;
const scaleImages = require('gulp-scale-images');
const path = require('path');
const extReplace = require("gulp-ext-replace");

// Tasks
// Image resizing using gulp-scale-images and
// optimization using imagemin with non-default plugins

// This function makes two variants of each source image
const retinaVersions = (file, cb) => {
  const normalVersion = file.clone()
  normalVersion.scale = {
    maxWidth: 576,
    maxHeight: 500,
    suffix: '-half',
    fit: 'inside'
  }
  const retinaVersion = file.clone()
  retinaVersion.scale = {
    maxWidth: 1080,
    maxHeight: 700,
    fit: 'inside'
  }

  cb(null, [normalVersion, retinaVersion])
}

// Post header image sizes for various uses
const headerVersions = (file, cb) => {
  const maxVersion = file.clone()
  maxVersion.scale = {
    maxWidth: 1280,
    maxHeight: 600,
    fit: 'inside'
  }
  const postVersion = file.clone()
  postVersion.scale = {
    maxWidth: 1080,
    maxHeight: 450,
    fit: 'cover',
    folder: '1080x450/'
  }
  const recentVersion = file.clone()
  recentVersion.scale = {
    maxWidth: 360,
    maxHeight: 250,
    //suffix: '@2x',
    fit: 'cover',
    folder: '360x250/'
  }
  const smallVersion = file.clone()
  smallVersion.scale = {
    maxWidth: 270,
    maxHeight: 145,
    fit: 'cover',
    folder: '270x145/'
  }
  const thumbnailVersion = file.clone()
  thumbnailVersion.scale = {
    maxWidth: 250,
    maxHeight: 150,
    fit: 'cover',
    folder: '250x150/'
  }

  cb(null, [maxVersion, postVersion, recentVersion, smallVersion, thumbnailVersion])
}

// By default, gulp-scale-images names files with dimensions
const imageFileName = (output, scale, cb) => {
  const fileName = [
    scale.folder || "",
    path.basename(output.path, output.extname),
    scale.suffix || "",
    output.extname
  ].join('')

  cb(null, fileName)
}

// Optimize post header images
function minimizePostImages(cb) {
  console.log(`Reading POST IMAGES from ${paths.postImageFilesGlob}`);
  console.log(`Writing POST IMAGES to ${paths.sitePostImageFiles}`);
  return gulp.src(paths.postImageFilesGlob)
    .pipe(newer(paths.sitePostImageFiles))
    .pipe(flatMap(headerVersions))
    .pipe(scaleImages(imageFileName))
    .pipe(imagemin([mozjpeg(), pngquant()]))
    .pipe(gulp.dest(paths.sitePostImageFiles));
}
gulp.task('minimizePostImages', minimizePostImages);

// Optimize post content images

function convertToWebP(cb) {
  console.log(`Reading IMAGES from ${paths.imageFilesGlob}`);
  console.log(`Writing IMAGES to ${paths.siteImageFiles}`);
  return gulp.src(paths.imageFilesGlob)
    //.pipe(newer(paths.siteImageFiles))
    .pipe(imagemin([webp({ quality: 75 })]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(paths.siteImageFiles));
}
gulp.task('convertWebp', convertToWebP);

function minimizeImages(cb) {
  console.log(`Reading IMAGES from ${paths.imageFilesGlob}`);
  console.log(`Writing IMAGES to ${paths.siteImageFiles}`);
  return gulp.src(paths.imageFilesGlob)
    .pipe(newer(paths.siteImageFiles))
    .pipe(flatMap(retinaVersions))
    .pipe(scaleImages(imageFileName))
    .pipe(imagemin([mozjpeg(), pngquant()]))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(imagemin([webp({ quality: 75 })]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(paths.siteImageFiles));
}
gulp.task('minimizeImages', minimizeImages);

// Watch Tasks
function watchImages(cb) {
  gulp.watch(paths.postImageFilesGlob, gulp.series(minimizePostImages, 'reload'));
  gulp.watch(paths.imageFilesGlob, gulp.series(minimizeImages, convertWebp, 'reload'));
}
gulp.task('watchImages', watchImages);