/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import args from 'minimist';
import chalk from "chalk";
import del from "del";
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import log from 'fancy-log';
import plumber from "gulp-plumber";
import sassPartialsImported from 'gulp-sass-partials-imported';
import sourcemaps from 'gulp-sourcemaps';

// #####################################################################################################################

import config from '../config.js';
import pathGroup from '../helpers/path-group.js';
import errorHandler from "../helpers/error-handler.js";
import niceDuration from "../helpers/nice-duration.js";

// #####################################################################################################################

const engineFlag = args(process.argv)["engine"] || 'dart';

let engine;
let engineName;

switch (engineFlag){
    case 'dart':
        engineName = chalk.blue('DartSass DartSDK');
        engine = await import('sass-embedded');
        break;
    case 'dart-js':
        engineName = chalk.yellow('DartSass Js');
        engine = await import('sass');
        engine = engine.default;
        break;
}

const sass = gulpSass(engine);

// #####################################################################################################################

/**
 * Compiling all sass files from all path group
 */
function sassCompileAll( done) {
    log(`Compile sass using ${chalk.bold(engineName)}`);

    const tasks = [];
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
                `${currentPaths.target.scss}**/*.css`,
                `${currentPaths.target.scss}**/*.css.map`
            ];

            del(deleteQueue).then( _ => {
                gulp.src(`${currentPaths.source.scss}**/*.scss`, `!${currentPaths.source.scss}**/_*.scss`)
                    .pipe(plumber({
                        errorHandler: errorHandler
                    }))
                    .pipe(sourcemaps.init())
                    .pipe(sass({}, false))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(currentPaths.target.scss))
                    .on("end", _ => callback());
            });
        } else {
            callback();
        }
    }
}

// #####################################################################################################################

/**
 * Compile single sass file
 *
 * @param file
 * @param done
 */
function sassCompileFile(file, done) {
    log(`Compile sass using ${chalk.bold(engineName)}`);

    const start = Date.now();
    const currentPaths = pathGroup(file, ['source', 'scss'], true);

    gulp.src(file)
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(sassPartialsImported(currentPaths.source.scss))
        .pipe(sourcemaps.init())
        .pipe(sass({}, false))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(currentPaths.target.scss))
        .on("end", _ => {
            log(`Finished compiling ${file} in ${chalk.magenta(niceDuration(Date.now() - start))}`);
            done();
        });
}

// #####################################################################################################################

sassCompileAll.displayName = 'sass-compile';
sassCompileAll.description = 'Compile scss to css files.';
sassCompileAll.flags = {'--engine': 'Choose engine dart|dart-js'};
export {sassCompileFile, sassCompileAll};
export default sassCompileAll;

// #####################################################################################################################

// EOF
