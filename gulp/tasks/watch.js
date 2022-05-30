/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';
import log from "fancy-log";
import path from "path";

import del from "del";

// #####################################################################################################################

import {sassCompileFile} from "./sass-compile.js";
import config from '../config.js';
import pathGroup from "../helpers/path-group.js";

// #####################################################################################################################

/**
 *
 */
function unlinkRelativeFile(eventPath) {
    const ext = path.extname(eventPath).replace(".", "");

    const currentPaths = pathGroup(eventPath, ext, true);

    let deleteQueue = [];

    switch (ext) {
        case 'scss':
            deleteQueue.push(currentPaths.development.css + path.relative(currentPaths.scss, eventPath).replace('.scss', '.css'));
            break
        case 'js':
            //js.map
            //js dev
            break
    }

    if (deleteQueue.length) {
        del(deleteQueue).then(_ => {
            let message = 'Deleted related files:';
            deleteQueue.forEach(filePath => {
                message += `\n\r ./${filePath}`
            });

            log(message);
        });
    }
}

// #####################################################################################################################

/**
 *
 */
function watchFiles() {
    gulp.watch(
        [
            config.paths.system.scss + '**/*.scss',
            config.paths.admin.scss + '**/*.scss'
        ]
    ).on('change', function (eventPath) {
        sassCompileFile(eventPath, function () {
        });
    }).on('add', function (eventPath) {
        sassCompileFile(eventPath, function () {
        });
    }).on('unlink', function (eventPath) {
        unlinkRelativeFile(eventPath);
    });
}

// #####################################################################################################################

watchFiles.displayName = 'watch';
watchFiles.description = "Compiles scss files and transpiles js files in real time.";
watchFiles.flags = {'--dart': 'Use native Dart SDK'};
export default watchFiles;

// #####################################################################################################################

// EOF
