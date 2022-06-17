/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

/**
 * Nice format time
 * @param time
 * @returns {string}
 */
function niceDuration(time) {
    if (time < 1000) {
        return `${time}ms`
    } else if (time < 60000) {
        return `${(time / 1000).toFixed(0)}.${(time % 1000).toString().padStart(3, '0')}s`
    } else {
        return `${Math.floor(time / 60000)}.${((time % 60000) / 1000).toFixed(0).padStart(2, '0')}m`
    }
}

// #####################################################################################################################

export default niceDuration;

// #####################################################################################################################

// EOF
