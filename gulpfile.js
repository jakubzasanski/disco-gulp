
/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// ##### [EXPORT ALL TASKS] ############################################################################################

export {default as disco} from "./gulp/tasks/disco.js";
export {default as postFont} from "./gulp/tasks/post-font.js";
export {default as sassCompile} from "./gulp/tasks/sass-compile.js";
export {default as watchFiles} from "./gulp/tasks/watch.js";

// ##### [DEFAULT TASKS] ###############################################################################################

import gulp from 'gulp';
import disco from "./gulp/tasks/disco.js";

const defaultTask = gulp.series(disco);

export default defaultTask;

// EOF
