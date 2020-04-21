//var config = {};
var paths = {
  config: {}
};

// Requires
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));

// Config Settings
paths.config.remote = "https://owenfranssen.com/"; 

paths.config.serve = ((argv['serve'] || '').trim().toLowerCase() || false);
if(paths.config.serve == "true") paths.config.serve = true;

paths.config.proxy = false;

paths.config.upload = ((argv['ftp'] || '').trim().toLowerCase() || false);
if(paths.config.upload == "true") paths.config.upload = true;

paths.config.env = (argv['env'] || 'live').trim().toLowerCase(); // live | dev

paths.config.incremental = ((argv['incremental'] || '').trim().toLowerCase() || true); 
if(paths.config.incremental == "false") paths.config.incremental = false;

// Directory locations.
paths.sourceDir = 'src/'; // The source files - user editid.
paths.tempDir = 'tmp/'; // The source asset files.
paths.siteDir = 'owenfranssen.com/'; // The resulting static site.

// Folder naming conventions.
paths.fontFolder = 'fonts/';
paths.imageFolder = 'img/';
paths.scriptFolder = 'js/';
paths.sassFolder = 'scss/';
paths.stylesFolder = 'css/';

// Asset files locations.
paths.sassFiles = paths.sourceDir + paths.sassFolder;
paths.jsFiles = paths.sourceDir + paths.scriptFolder;
paths.imageFiles = paths.sourceDir + paths.imageFolder;
paths.fontFiles = paths.sourceDir + paths.fontFolder;

// temp files locations.
paths.tempPostFiles = paths.tempDir + paths.postFolder;
//paths.tempCssFiles = paths.tempAssetsDir + paths.stylesFolder;
//paths.tempJsFiles = paths.tempAssetsDir + paths.scriptFolder;
//paths.tempImageFiles = paths.tempAssetsDir + paths.imageFolder;
//paths.tempPostImageFiles = paths.tempAssetsDir + paths.imageFolder + '/' + paths.postImagesFolder;
//paths.tempFontFiles = paths.tempAssetsDir + paths.fontFolder;

// Site files locations.
paths.siteCssFiles = paths.siteDir + paths.stylesFolder;
paths.siteJsFiles = paths.siteDir + paths.scriptFolder;
paths.siteImageFiles = paths.siteDir + paths.imageFolder;
paths.siteFontFiles = paths.siteDir + paths.fontFolder;

// Glob patterns by file type.
paths.sassPattern = '**/*.scss';
paths.jsPattern = '*.js';
paths.imagePattern = '*.+(jpg|jpeg|png|svg|gif|webp|tif)';
paths.phpPattern = '**/*.+(php|html)';
paths.htmlPattern = '**/*.html';

// Asset files globs
paths.sassFilesGlob = paths.sassFiles + paths.sassPattern;
paths.jsFilesGlob = paths.jsFiles + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;

// temp files globs
// paths.tempPostFilesGlob = paths.tempPostFiles + paths.markdownPattern;
// paths.tempHtmlFilesGlob = paths.tempDir + '*.html';
// paths.tempImageFilesGlob = paths.tempImageFiles + paths.imagePattern;
// paths.tempPostImageFilesGlob = paths.tempPostImageFiles + paths.postImagePattern;

// Soure files globs
paths.sourceHtmlFilesglob = paths.sourceDir + paths.phpPattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.phpPattern;

module.exports = paths;