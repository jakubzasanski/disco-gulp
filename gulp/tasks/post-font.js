/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import args from 'minimist';
import del from "del";
import Fontmin from 'fontmin';
import log from 'fancy-log';

// #####################################################################################################################

import config from '../config.js';

// #####################################################################################################################

/**
 *
 */
function postFont(done) {
    const sourceExtension = args(process.argv)["source"] || config.tasks.postFont.defaultExtension;
    const sourceFontName = args(process.argv)["name"] || config.tasks.postFont.defaultFontName;

    const fontCompress = new Fontmin()
        .src(`./${config.paths.default.font}${sourceFontName}/*.${sourceExtension}`)
        .dest(`./${config.paths.default.font}${sourceFontName}/`)


    fontCompress.run(function (err, files) {
        if (err) {
            throw err;
        }

        del(`./${config.paths.default.font}${sourceFontName}/*.css`).then(_ => {
            log(`Success deleted following files: \n\r ./${config.paths.default.font}${sourceFontName}/*.css`);
            done();
        });
    });
}

// #####################################################################################################################

postFont.displayName = "post-font";
postFont.description = "Convert and minify font files.";
postFont.flags = {
    '--name': 'Set source name', '--source': 'Set source extension'
};
export {postFont};
export default postFont;

// #####################################################################################################################

// EOF
