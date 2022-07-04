/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import del from "del";
import gulp from 'gulp';
import log from "fancy-log";
import path from "path";

// #####################################################################################################################

import {jsTranspileFile} from "./js-transpile.js";
import {sassCompileFile} from "./sass-compile.js";

// #####################################################################################################################

import config from '../config.js';
import pathGroup from "../helpers/path-group.js";

// #####################################################################################################################

/**
 * Delete relative files
 * @param eventPath
 */
function unlinkRelativeFile(eventPath) {
    const ext = path.extname(eventPath).replace(".", "");

    const currentPaths = pathGroup(eventPath, ['source', ext], true);

    let deleteQueue = [];

    switch (ext) {
        case 'scss':
            deleteQueue.push(currentPaths.target.scss + path.relative(currentPaths.source.scss, eventPath).replace('.scss', '.css'));
            deleteQueue.push(currentPaths.target.scss + path.relative(currentPaths.source.scss, eventPath).replace('.scss', '.css.map'));
            break
        case 'js':
            deleteQueue.push(currentPaths.target.js + path.relative(currentPaths.source.js, eventPath));
            deleteQueue.push(currentPaths.target.js + path.relative(currentPaths.source.js, eventPath).replace('.js', '.js.map'));
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
            if(config.paths[pathGroup]['source']['scss']){
                watchPaths.scss.push(`${config.paths[pathGroup]['source']['scss']}**/*.scss`);
            }
            if(config.paths[pathGroup]['source']['js']){
                watchPaths.js.push(`${config.paths[pathGroup]['source']['js']}**/*.js`);
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
watchFiles.flags = {'--engine': 'Choose engine dart|dart-js'};
export default watchFiles;

// #####################################################################################################################

// EOF
