/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';
import gulp from 'gulp';
import plumber from "gulp-plumber";
import postCSS from 'gulp-postcss';
import rename from 'gulp-rename';

// #####################################################################################################################

import config from '../config.js';
import errorHandler from "../helpers/error-handler.js";
import del from "del";

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

            const deleteQueue = [
                `${currentPaths.production.css}**/*.css`,
            ];

            del(deleteQueue).then( _ => {
                gulp.src(currentPaths.development.css + "**/*.css")
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(postCSS([autoprefixer(), cssNano()]))
                    .pipe(rename({"suffix": ".min"}))
                    .pipe(gulp.dest(currentPaths.production.css))
                    .on("end", _ => callback());
            });
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
