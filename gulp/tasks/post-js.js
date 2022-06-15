/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';
import plumber from "gulp-plumber";
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

// #####################################################################################################################

import config from '../config.js';
import errorHandler from "../helpers/error-handler.js";

// #####################################################################################################################

/**
 * Compress all js files from all paths group
 */
function postJs(done) {
    let tasks = [];
    config.pathsGroup.forEach(group => {
        tasks.push(new Promise((resolve) => {
            compressJs(group, resolve);
        }));
    });

    Promise.all(tasks).then(() => {
        done();
    });

    function compressJs(group, callback) {
        if (config.paths.hasOwnProperty(group)) {
            const currentPaths = config.paths[group];

            gulp.src(currentPaths.development.js + "**/*.js")
                .pipe(plumber({
                    errorHandler: errorHandler
                }))
                .pipe(uglify())
                .pipe(rename({"suffix": ".min"}))
                .pipe(gulp.dest(currentPaths.production.js))
                .on("end", callback());

        } else {
            callback();
        }
    }
}

// #####################################################################################################################

postJs.displayName = 'post-js';
postJs.description = "Compress js files.";
export default postJs;

// #####################################################################################################################

// EOF
