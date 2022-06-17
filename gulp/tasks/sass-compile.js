/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import args from 'minimist';
import colors from "ansi-colors";
import del from "del";
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import gulpIf from 'gulp-if';
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
    case 'node':
        engineName = colors.green('libSass');
        engine = await import('node-sass');
        break;
    case 'dart':
        engineName = colors.blue('DartSass DartSDK');
        engine = await import('sass-embedded');
        break;
    case 'dart-js':
        engineName = colors.yellow('DartSass Js');
        engine = await import('sass');
        engine = engine.default;
        break;
}

log(`Compile sass using ${colors.bold(engineName)}`);
const sass = gulpSass(engine);

// #####################################################################################################################

/**
 * Compiling all sass files from all path group
 */
function sassCompileAll( done) {

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
 * Compile single sass file
 *
 * @param file
 * @param done
 */
function sassCompileFile(file, done) {
    const start = Date.now();
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
            log(`Finished compiling ${file} in ${colors.magenta(niceDuration(Date.now() - start))}`);
            done();
        });
}

// #####################################################################################################################

sassCompileAll.displayName = 'sass-compile';
sassCompileAll.description = 'Compile scss to css files.';
sassCompileAll.flags = {'--engine': 'Choose engine node|dart|dart-js'};
export {sassCompileFile, sassCompileAll};
export default sassCompileAll;

// #####################################################################################################################

// EOF
