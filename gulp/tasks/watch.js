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

// #####################################################################################################################

/**
 *
 */
function unlinkRelativeFile(eventPath) {
    const ext = path.extname(eventPath).replace(".", "");
    let deleteQueue = [];

    switch (ext) {
        case 'scss':
            //css dev
            //css build
            break
        case 'js':
            //js.map
            //js dev
            //js build
            break
    }

    if (deleteQueue.length) {
        del(deleteQueue).then(_ => {
            log("Deleted related file: " + deleteQueue);
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
