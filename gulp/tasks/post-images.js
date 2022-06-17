/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import plumber from 'gulp-plumber';

// #####################################################################################################################

import config from '../config.js';
import errorHandler from '../helpers/error-handler.js';
import del from "del";

// #####################################################################################################################

/**
 * Compress all images from all paths group
 */
function postImages(done) {
    let tasks = [];
    config.pathsGroup.forEach(group => {
        tasks.push(new Promise((resolve) => {
            compressImages(group, resolve);
        }));
    });

    Promise.all(tasks).then(() => {
        done();
    });

    function compressImages(group, callback) {
        if (config.paths.hasOwnProperty(group)) {
            const currentPaths = config.paths[group];

            const deleteQueue = [
                `${currentPaths.production.images}**/*`,
            ];

            del(deleteQueue).then( _ => {
                gulp.src(currentPaths.development.images + "**/*")
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(imagemin([
                        gifsicle({
                            interlaced: true,
                            optimizationLevel: 1
                        }),
                        mozjpeg(),
                        optipng({
                            optimizationLevel: 3
                        }),
                        svgo()
                    ]))
                    .pipe(gulp.dest(currentPaths.production.images))
                    .on("end", _ => callback());
            });
        } else {
            callback();
        }
    }
}

// #####################################################################################################################

postImages.displayName = 'post-images';
postImages.description = 'Optimize your project images for production';
export default postImages;

// #####################################################################################################################

// EOF
