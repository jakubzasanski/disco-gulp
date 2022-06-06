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
        js: 'admin/assets/development/source/js/',
        font: 'admin/assets/public/font/',
        development: {
            css: 'admin/assets/development/css/',
            js: 'admin/assets/development/js/'
        },
        production: {
            css: 'admin/assets/production/css/',
            js: 'admin/assets/production/js/'
        }
    },
    system: {
        main: 'assets/',
        scss: 'assets/development/source/scss/',
        js: 'assets/development/source/js/',
        font: 'assets/public/font/',
        development: {
            css: 'assets/development/css/',
            js: 'assets/development/js/'
        },
        production: {
            css: 'assets/production/css/',
            js: 'assets/production/js/'
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
