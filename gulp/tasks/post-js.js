/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import del from "del";
import gulp from 'gulp';
import plumber from "gulp-plumber";
import rename from 'gulp-rename';
import sizeDiff from 'gulp-size-difference';
import uglify from 'gulp-uglify';

// #####################################################################################################################

import config from '../config.js';
import errorHandler from '../helpers/error-handler.js';

// #####################################################################################################################

/**
 * Compress all js files from all paths group
 */
function postJs(done) {
    const tasks = [];
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

            const deleteQueue = [
                `${currentPaths.production.js}`,
            ];

            del(deleteQueue).then(_ => {
                gulp.src(currentPaths.development.js + "**/*.js")
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(sizeDiff.start())
                    .pipe(uglify())
                    .pipe(sizeDiff.stop({title: `JS ${group}`}))
                    .pipe(rename({"suffix": ".min"}))
                    .pipe(gulp.dest(currentPaths.production.js))
                    .on("end", _ => {
                        callback();
                    });

            });
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
