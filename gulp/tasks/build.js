/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';

// #####################################################################################################################

import sassCompile from './sass-compile.js';
import postCss from './post-css.js';

// #####################################################################################################################

const build = gulp.series(gulp.parallel(gulp.series(sassCompile, postCss)));

// #####################################################################################################################

build.displayName = 'build';
build.description = 'Optimize your project for production';
build.flags = {'--dart': 'Use native Dart SDK'};
export default build;

// #####################################################################################################################

// EOF
