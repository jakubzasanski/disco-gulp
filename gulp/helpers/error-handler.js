
/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import notify from "gulp-notify";

// #####################################################################################################################

function errorHandler(error) {
    notify.onError({
        title: error.code,
        message: error.message,
        sound: "Beep"
    })(error);
}

export default errorHandler;