
/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// ##### [EXPORT ALL TASKS] ############################################################################################

export {default as build} from "./gulp/tasks/build.js";
export {default as disco} from "./gulp/tasks/disco.js";
export {default as iconFont} from "./gulp/tasks/icon-font.js";
export {default as jsTranspile} from "./gulp/tasks/js-transpile.js";
export {default as postCss} from "./gulp/tasks/post-css.js";
export {default as postImages} from "./gulp/tasks/post-images.js";
export {default as postJs} from "./gulp/tasks/post-js.js";
export {default as postFont} from "./gulp/tasks/post-font.js";
export {default as sassCompile} from "./gulp/tasks/sass-compile.js";
export {default as watchFiles} from "./gulp/tasks/watch.js";

// ##### [DEFAULT TASKS] ###############################################################################################

import gulp from 'gulp';
import disco from "./gulp/tasks/disco.js";

const defaultTask = gulp.series(disco);

export default defaultTask;

// EOF
