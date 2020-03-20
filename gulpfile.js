const { src, dest, watch, series, parallel } = require("gulp")
const rename = require("gulp-rename")
const pug = require("gulp-pug")
const sass = require("gulp-sass")
sass.compiler = require("node-sass")
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync').create()

// Config para produccion o develop
const production = false

// config PUG
const pugOptionsDev = {
  pretty: true
}

// config SASS
const sassOptionsDev = {
  includePaths: ['node_modules'],
  sourceComments: true,
  outputStyle: 'expanded'
}

const sassOptionsProd = {
  includePaths: ['node_modules'],
  outputStyle: 'compressed'
}

// Config PostCSS
const postcssPlugins = [
  autoprefixer(),
]

// Tasks
function viewsDev() {
  return src("./src/views/*.pug")
    .pipe(pug(pugOptionsDev))
    .pipe(dest("./public/"))
}

function viewsProd() {
  return src("./src/views/*.pug")
    .pipe(pug())
    .pipe(dest("./public/"))
}

function stylesDev() {
  return src("./src/styles/*.scss")
    .pipe(sass(sassOptionsDev).on("error", sass.logError))
    .pipe(rename('styles.css'))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream())
}

function stylesProd() {
  return src("./src/styles/*.scss")
    .pipe(sass(sassOptionsProd).on("error", sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(rename('styles.min.css'))
    .pipe(dest("./public/css/"))
    .pipe(browserSync.stream())
}

function scriptsDev() {
  return src('./src/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env'],
      comments: false
    }))
    .pipe(concat('scripts.js'))
    .pipe(dest('./public/js'))
}

function scriptsProd() {
  return src('./src/scripts/*.js')
    .pipe(babel({
      presets: [
        ['@babel/preset-env'],
        ['minify', { builtIns: false }]
      ],
      comments: false
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(dest('./public/js'))
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
    port: 3000
  })

  production
    ? watch("src/styles/*.scss", stylesProd)
    : watch("src/styles/*.scss", stylesDev)
  production
    ? watch("src/views/*.pug", viewsProd).on('change', browserSync.reload)
    : watch("src/views/*.pug", viewsDev).on('change', browserSync.reload)
  production
    ? watch("./src/scripts/*.js", scriptsProd).on('change', browserSync.reload)
    : watch("./src/scripts/*.js", scriptsDev).on('change', browserSync.reload)
}

// Exports
exports.viewsDev = viewsDev
exports.viewsProd = viewsProd
exports.stylesDev = stylesDev
exports.stylesProd = stylesProd
exports.scriptsDev = scriptsDev
exports.scriptsProd = scriptsProd
exports.default = server