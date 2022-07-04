/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import del from "del";
import gulp from 'gulp';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import sizeDifference from "gulp-size-difference";

// #####################################################################################################################

import config from '../config.js';
import errorHandler from '../helpers/error-handler.js';

// #####################################################################################################################

/**
 * Compress all images from all paths group
 */
function postImages(done) {
    const tasks = [];
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
                `${currentPaths.production.images}`,
            ];

            del(deleteQueue).then( _ => {
                gulp.src(currentPaths.development.images + "**/*")
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(sizeDifference.start())
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
                    ], {silent: true}))
                    .pipe(sizeDifference.stop({title: `IMAGES ${group}`}))
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
