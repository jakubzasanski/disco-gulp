/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import path from "path";

// #####################################################################################################################

import config from '../config.js';

// #####################################################################################################################

/**
 * Get path group by file path
 *
 * @param file
 * @param type
 * @param returnAll
 * @returns {Object}
 */
function pathGroup(file, type, returnAll = false) {
    let _return = {};
    if (file && type && config.pathsGroup) {
        file = path.resolve(path.dirname(file));
        for (let pathGroup of config.pathsGroup) {
            if (config.paths.hasOwnProperty(pathGroup)) {
                const pathType = getObjectProperty(config.paths[pathGroup], type);

                if (dirContains(path.resolve(pathType), file)) {
                    if (returnAll) {
                        _return = config.paths[pathGroup];
                    } else {
                        _return = pathType;
                    }
                    break;
                }
            }
        }
    }

    return _return;
}

// #####################################################################################################################

/**
 * Check path
 *
 * @param parent
 * @param dir
 * @returns {boolean}
 */
function dirContains(parent, dir) {
    if (parent === dir) {
        return true;
    } else {
        const relative = path.relative(parent, dir);
        return !relative.startsWith('..') && !path.isAbsolute(relative);
    }
}

// #####################################################################################################################

/**
 *
 * @param object
 * @param path
 * @returns {undefined|*}
 */
const getObjectProperty = (object, path) => {
    if (object == null) {
        return object;
    }

    if(typeof path !== 'object'){
        path = {path};
    }

    for (let property of path) {
       if(object.hasOwnProperty(property)){
           object = object[property];
       }
       else{
           object = undefined;
           break;
       }
    }

    return object;
};

// #####################################################################################################################

export default pathGroup;

// #####################################################################################################################

// EOF
