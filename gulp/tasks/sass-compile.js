/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import args from 'minimist';
import colors from "ansi-colors";
import dartSass from 'sass';
import dartSassEmbedded from 'sass-embedded';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import log from 'fancy-log';
import sassPartialsImported from 'gulp-sass-partials-imported';
import sourcemaps from 'gulp-sourcemaps';

// #####################################################################################################################

import config from '../config.js';
import pathGroup from '../helpers/path-group.js';
import del from "del";
import plumber from "gulp-plumber";
import errorHandler from "../helpers/error-handler.js";

// #####################################################################################################################

const dartSDK = args(process.argv)["dart"];
const sass = gulpSass(dartSDK ? dartSassEmbedded : dartSass);

// #####################################################################################################################

/**
 *
 */
function sassCompileAll(done) {
    if (dartSDK) {
        log(`Compile sass using native ${colors.blue(colors.bold("Dart SDK"))}...`);
    }

    let tasks = [];
    config.pathsGroup.forEach(group => {
        tasks.push(new Promise((resolve) => {
            compileScss(group, resolve);
        }));
    });

    Promise.all(tasks).then(() => {
        done();
    });

    function compileScss(group, callback) {
        if (config.paths.hasOwnProperty(group)) {
            const currentPaths = config.paths[group];

            const deleteQueue = [
                `${currentPaths.development.css}**/*.css`,
                `${currentPaths.development.css}**/*.css.map`
            ];

            del(deleteQueue).then( _ => {
                gulp.src(`${currentPaths.scss}**/*.scss`, `!${currentPaths.scss}**/_*.scss`)
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(sourcemaps.init())
                    .pipe(sass({}, false))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(currentPaths.development.css))
                    .on("end", _ => callback());
            });
        } else {
            callback();
        }
    }
}

// #####################################################################################################################

/**
 *
 */
function sassCompileFile(file, done) {
    const start = Date.now();

    if (dartSDK) {
        log(`Compile sass using native ${colors.blue(colors.bold("Dart SDK"))}...`);
    }

    const currentPaths = pathGroup(file, 'scss', true);

    gulp.src(file)
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(sassPartialsImported(currentPaths.scss))
        .pipe(sourcemaps.init())
        .pipe(sass({}, false))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(currentPaths.development.css))
        .on("end", _ => {
            const duration = Date.now() - start;
            const durationDisplay = (duration > 1000) ? (duration / 1000).toFixed(2) + ' s' : duration + ' ms';

            log(`Finished compiling ${file} in ${colors.magenta(durationDisplay)}`);

            done();
        });
}

// #####################################################################################################################

sassCompileAll.displayName = 'sass-compile';
sassCompileAll.description = 'Compile scss to css files.';
sassCompileAll.flags = {'--dart': 'Use native Dart SDK'};
export {sassCompileFile, sassCompileAll};
export default sassCompileAll;

// #####################################################################################################################

// EOF
