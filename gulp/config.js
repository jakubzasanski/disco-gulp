/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

const moduleExport = {}

/**
 *
 */
moduleExport.pathsGroup = ['system', 'admin'];

/**
 *
 */
moduleExport.paths = {
    default: {
        gulp: 'gulp/',
    },
    admin: {
        main: 'admin/assets/',
        scss: 'admin/assets/development/source/scss/',
        font: 'admin/assets/public/font/',
        development: {
            css: 'admin/assets/development/css/'
        },
        production: {
            css: 'admin/assets/production/css/'
        }
    },
    system: {
        main: 'assets/',
        scss: 'assets/development/source/scss/',
        font: 'assets/public/font/',
        development: {
            css: 'assets/development/css/'
        },
        production: {
            css: 'assets/production/css/'
        }
    }
};

/**
 *
 */
moduleExport.tasks = {
    postFont: {
        defaultExtension: 'ttf',
        defaultFontName: 'roboto',
        defaultGroup: 'system'
    }
};

export default moduleExport;

// EOF
