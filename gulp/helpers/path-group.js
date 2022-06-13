
/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import path from "path";
import config from '../config.js';

// #####################################################################################################################

function pathGroup(file, type, returnAll = false) {
    let _return = {};
    if (file && type && config.pathsGroup) {
        if (config.pathsGroup.length > 1) {
            file = path.resolve(path.dirname(file));
            for (let pathType of config.pathsGroup) {
                if (config.paths.hasOwnProperty(pathType) && config.paths[pathType][type]) {
                    if (dirContains(path.resolve(config.paths[pathType][type]), file)) {
                        if (returnAll) {
                            _return = config.paths[pathType];
                        } else {
                            _return = config.paths[pathType][type];
                        }
                        break;
                    }
                }
            }
        } else if (config.pathsGroup[0]) {
            if (returnAll) {
                _return = config.paths[config.pathsGroup[0]];
            } else {
                _return = config.paths[config.pathsGroup[0]][type];
            }
        }
    }

    return _return;
}

function dirContains(parent, dir) {
    if (parent === dir) {
        return true;
    } else {
        const relative = path.relative(parent, dir);
        return !relative.startsWith('..') && !path.isAbsolute(relative);
    }
}

export default pathGroup;

// EOF
