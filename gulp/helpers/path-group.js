import path from "path";
import config from '../config.js';

function pathGroup(file, type, returnAll = false) {
    let _return = {};
    if (file && type && config.pathsGroup) {
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