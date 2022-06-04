/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

const moduleExport = {}

/**
 *
 */
moduleExport.execOptions = {
    cwd: process.cwd(),
    wnv: process.env,
    stdio: "inherit"
};

export default moduleExport;

// EOF
