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
        icons: 'admin/assets/development/source/icons/',
        iconsPreview: 'admin/assets/development/source/icons/preview/',
        iconsSets: 'admin/assets/development/source/icons/sets/',
        iconsTemplate: 'admin/assets/development/source/icons/template/',
        iconsScss: 'admin/assets/development/source/scss/icon-font/',
        iconsFont: 'admin/assets/public/icon-font/',
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
        icons: 'assets/development/source/icons/',
        iconsPreview: 'assets/development/source/icons/preview/',
        iconsSets: 'assets/development/source/icons/sets/',
        iconsTemplate: 'assets/development/source/icons/template/',
        iconsScss: 'assets/development/source/scss/icon-font/',
        iconsFont: 'assets/public/icon-font/',
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
