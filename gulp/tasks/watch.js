/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import del from "del";
import gulp from 'gulp';
import log from "fancy-log";
import path from "path";

// #####################################################################################################################

import {jsTranspileFile} from "./js-transpile.js";
import {sassCompileFile} from "./sass-compile.js";
import pathGroup from "../helpers/path-group.js";

// #####################################################################################################################

import config from '../config.js';

// #####################################################################################################################

/**
 * Delete relative files
 */
function unlinkRelativeFile(eventPath) {
    const ext = path.extname(eventPath).replace(".", "");

    const currentPaths = pathGroup(eventPath, ext, true);

    let deleteQueue = [];

    switch (ext) {
        case 'scss':
            deleteQueue.push(currentPaths.development.css + path.relative(currentPaths.scss, eventPath).replace('.scss', '.css'));
            deleteQueue.push(currentPaths.development.css + path.relative(currentPaths.scss, eventPath).replace('.scss', '.css.map'));
            break
        case 'js':
            deleteQueue.push(currentPaths.development.js + path.relative(currentPaths.js, eventPath));
            deleteQueue.push(currentPaths.development.js + path.relative(currentPaths.js, eventPath).replace('.js', '.js.map'));
            break
    }

    if (deleteQueue.length) {
        del(deleteQueue).then( _ => {
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
 * Watch project files
 */
function watchFiles() {
    let watchPaths = {
        scss: [],
        js: []
    };

    for (let pathGroup of config.pathsGroup) {
        if (config.paths.hasOwnProperty(pathGroup)){
            if(config.paths[pathGroup]['scss']){
                watchPaths.scss.push(`${config.paths[pathGroup]['scss']}**/*.scss`);
            }
            if(config.paths[pathGroup]['js']){
                watchPaths.js.push(`${config.paths[pathGroup]['js']}**/*.js`);
            }
        }
    }

    gulp.watch(watchPaths.scss)
        .on('change', function (eventPath) {
            sassCompileFile(eventPath,_ => {});
        })
        .on('add', function (eventPath) {
            sassCompileFile(eventPath,_ => {});
        })
        .on('unlink', function (eventPath) {
            unlinkRelativeFile(eventPath);
        });

    gulp.watch(watchPaths.js)
        .on('change', function (eventPath) {
            jsTranspileFile(eventPath,_ => {});
        })
        .on('add', function (eventPath) {
            jsTranspileFile(eventPath,_ => {});
        })
        .on('unlink', function (eventPath) {
            unlinkRelativeFile(eventPath);
        });
}

// #####################################################################################################################

watchFiles.displayName = 'watch';
watchFiles.description = "Compiles scss files and transpiles js files in real time.";
watchFiles.flags = {'--engine': 'Choose engine node|dart|dart-js'};
export default watchFiles;

// #####################################################################################################################

// EOF
