/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';
import postCSS from 'gulp-postcss';
import cssNano from 'cssnano';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';

// #####################################################################################################################

import config from '../config.js';

// #####################################################################################################################

/**
 *
 */
function postCss(done) {
    let tasks = [];
    config.pathsGroup.forEach(group => {
        tasks.push(new Promise((resolve) => {
            compressCss(group, resolve);
        }));
    });

    Promise.all(tasks).then(() => {
        done();
    });

    function compressCss(group, callback) {
        if (config.paths.hasOwnProperty(group)) {
            const currentPaths = config.paths[group];

            gulp.src(currentPaths.development.css + "**/*.css")
                .pipe(postCSS([autoprefixer()]))
                .pipe(postCSS([cssNano()]))
                .pipe(rename({"suffix": ".min"}))
                .pipe(gulp.dest(currentPaths.production.css))
                .on("end", callback());

        } else {
            callback();
        }
    }
}

// #####################################################################################################################

postCss.displayName = 'post-css';
postCss.description = 'Add prefixes and compress css.';
export {postCss};
export default postCss;

// #####################################################################################################################

// EOF
