/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import babel from 'gulp-babel';
import colors from "ansi-colors";
import gulp from 'gulp';
import log from 'fancy-log';
import sourcemaps from 'gulp-sourcemaps';

// #####################################################################################################################

import config from '../config.js';
import pathGroup from '../helpers/path-group.js';
import rename from "gulp-rename";
import path from "path";

// #####################################################################################################################

/**
 *
 */
function jsTranspileAll(done) {
    let tasks = [];
    config.pathsGroup.forEach(group => {
        tasks.push(new Promise((resolve) => {
            jsTranspile(group, resolve);
        }));
    });

    Promise.all(tasks).then(() => {
        done();
    });

    function jsTranspile(group, callback) {
        if (config.paths.hasOwnProperty(group)) {
            const currentPaths = config.paths[group];

            gulp.src(`${currentPaths.js}**/*.js`)
                .pipe(sourcemaps.init())
                .pipe(babel({
                    "presets": [["@babel/preset-env", {"targets": "defaults"}]]
                }))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(currentPaths.development.js))
                .on("end", callback());
        } else {
            callback();
        }
    }
}

// #####################################################################################################################

/**
 *
 */
function jsTranspileFile(file, done) {
    const start = Date.now();

    const currentPaths = pathGroup(file, 'js', true);

    gulp.src(file)
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": [["@babel/preset-env", {"targets": "defaults"}]]
        }))
        .pipe(rename(function (pipeFile) {
            const jsPath = path.resolve(currentPaths.js);
            const filePath = path.resolve(pipeFile.dirname);
            pipeFile.dirname = filePath === jsPath ? '.' : path.relative(jsPath, filePath);
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(currentPaths.development.js))
        .on("end", _ => {
            const duration = Date.now() - start;
            const durationDisplay = (duration > 1000) ? (duration / 1000).toFixed(2) + ' s' : duration + ' ms';

            log(`Finished transpiling ${file} in ${colors.magenta(durationDisplay)}`);

            done();
        });
}

// #####################################################################################################################

jsTranspileAll.displayName = 'js-transpile';
jsTranspileAll.description = 'Transpile JavaScript to most supported version.';
export {jsTranspileFile, jsTranspileAll};
export default jsTranspileAll;

// #####################################################################################################################

// EOF
