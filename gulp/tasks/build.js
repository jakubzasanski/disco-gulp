/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import gulp from 'gulp';

// #####################################################################################################################

import {sassCompileAll} from './sass-compile.js';
import postCss from './post-css.js';
import jsTranspileAll from './js-transpile.js';
import postJs from './post-js.js';
import postImages from './post-images.js';

// #####################################################################################################################

const build = gulp.parallel(gulp.series(sassCompileAll, postCss), gulp.series(jsTranspileAll, postJs), postImages);

// #####################################################################################################################

build.displayName = 'build';
build.description = 'Optimize your project for production';
build.flags = {'--engine': 'Choose engine dart|dart-js'};
export default build;

// #####################################################################################################################

// EOF
