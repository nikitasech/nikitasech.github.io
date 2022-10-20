const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gcmq = require('gulp-group-css-media-queries');

const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');

const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const clean = () => {
  return del('build');
};

const copy = () => {
  return gulp.src([
    'source/*.html',
    'source/*.ico',
    'source/fonts/**',
  ], {
    base: 'source',
  })
  .pipe(gulp.dest('build'));
}

const svg = () => {
  return gulp.src('source/img/**/*.svg', {base: 'source'})
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {convertStyleToAttrs: true},
          {sortAttrs: true}
        ]
      })
    ]))
    .pipe(gulp.dest('build/img'));
}

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};

const img = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.mozjpeg({progressive: true})
    ]))
    .pipe(gulp.dest('build/img/'))
}

const createWebp = () => {
  return gulp.src(`source/img/**/*.{png,jpg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`source/img/`));
};

const html = () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build/'));
}

const css = () => {
  return gulp.src('source/sass/style.scss')
  .pipe(plumber({
    errorHandler: function(err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(({
      grid: true,
    }))
  ]))
  .pipe(gcmq())
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css/'));
}

const js = () => {
  return gulp.src(['source/js/main.js'])
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/js/'))
};

const refresh = (done) => {
  browserSync.reload();
  done();
};

const server = () => {
  browserSync.init({
    server: 'build/',
    index: 'index.html',
    notify: false,
    open: false,
    cors: true,
    ui: false,
  });

  gulp.watch('source/**.html', gulp.series(html, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series(css, refresh));
  gulp.watch('source/js/**/*.{js,json}', gulp.series(js, refresh));
  gulp.watch('source/data/**/*.{js,json}', gulp.series(copy, refresh));
  gulp.watch('source/img/**/*.svg', gulp.series(svg, sprite, refresh));
  gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(img, refresh));

  gulp.watch('source/favicon.{*}', gulp.series(copy, refresh));
  gulp.watch('source/video/**', gulp.series(copy, refresh));
  gulp.watch('source/downloads/**', gulp.series(copy, refresh));
  gulp.watch('source/*.php', gulp.series(copy, refresh));
};

const build = gulp.series(clean, copy, img, svg, sprite, html, css, js);
const start = gulp.series(build, server);

exports.webp = createWebp;
exports.start = start;
exports.build = build;
