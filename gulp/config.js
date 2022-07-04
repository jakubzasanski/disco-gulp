/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
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
        source: {
            scss: 'admin/assets/development/source/scss/',
            js: 'admin/assets/development/source/js/',
            icons: {
                main: 'admin/assets/development/source/icons/',
                preview: 'admin/assets/development/source/icons/preview/',
                sets: 'admin/assets/development/source/icons/sets/',
                template: 'admin/assets/development/source/icons/template/',
            }
        },
        target: {
            scss: 'admin/assets/development/css/compiled/',
            js: 'admin/assets/development/js/compiled/',
            icons: {
                scss: 'admin/assets/development/source/scss/icon-font/',
            }
        },
        development: {
            css: 'admin/assets/development/css/',
            js: 'admin/assets/development/js/',
            images: 'admin/assets/development/images/'
        },
        production: {
            css: 'admin/assets/production/css/',
            js: 'admin/assets/production/js/',
            images: 'admin/assets/production/images/'
        },
        storage: {
            iconFont: 'admin/assets/storage/icon-font/',
            font: 'admin/assets/storage/font/',
        }
    },
    system: {
        main: 'assets/',
        source: {
            scss: 'assets/development/source/scss/',
            js: 'assets/development/source/js/',
            ts: 'assets/development/source/ts/',
            icons: {
                main: 'assets/development/source/icons/',
                preview: 'assets/development/source/icons/preview/',
                sets: 'assets/development/source/icons/sets/',
                template: 'assets/development/source/icons/template/',
            }
        },
        target: {
            scss: 'assets/development/css/compiled/',
            js: 'assets/development/js/compiled/',
            icons: {
                scss: 'assets/development/source/scss/icon-font/',
            }
        },
        development: {
            css: 'assets/development/css/',
            js: 'assets/development/js/',
            images: 'assets/development/images/'
        },
        production: {
            css: 'assets/production/css/',
            js: 'assets/production/js/',
            images: 'assets/production/images/'
        },
        storage: {
            iconFont: 'assets/storage/icon-font/',
            font: 'assets/storage/font/',
        }
    }
};

// #####################################################################################################################

export default moduleExport;

// EOF
