/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';
import del from "del";
import gulp from 'gulp';
import plumber from "gulp-plumber";
import postCSS from 'gulp-postcss';
import rename from 'gulp-rename';
import sizeDifference from "gulp-size-difference";

// #####################################################################################################################

import config from '../config.js';
import errorHandler from "../helpers/error-handler.js";

// #####################################################################################################################

/**
 *
 */
function postCss(done) {
    const tasks = [];
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
                `${currentPaths.production.css}`,
            ];

            del(deleteQueue).then( _ => {
                gulp.src(currentPaths.development.css + "**/*.css")
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(postCSS([autoprefixer()]))
                    .pipe(sizeDifference.start())
                    .pipe(postCSS([cssNano()]))
                    .pipe(sizeDifference.stop({title: `CSS ${group}`}))
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
