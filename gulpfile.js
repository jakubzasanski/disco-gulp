
/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// ##### [EXPORT ALL TASKS] ############################################################################################

// TODO:: gulp-load-subtasks or something similar

export {default as disco} from "./gulp/tasks/disco.js";
export {default as postFont} from "./gulp/tasks/post-font.js";


// ##### [DEFAULT TASKS] ###############################################################################################

import gulp from 'gulp';
import disco from "./gulp/tasks/disco.js";

const defaultTask = gulp.series(disco);

export default defaultTask;

// EOF
