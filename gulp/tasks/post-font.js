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

import colors from "ansi-colors";

// #####################################################################################################################

import config from '../config.js';

// #####################################################################################################################

/**
 *
 */
function postFont(done) {
    const sourceExtension = args(process.argv)["source"] || config.tasks.postFont.defaultExtension;
    const sourceFontName = args(process.argv)["name"] || config.tasks.postFont.defaultFontName;
    const sourceGroup = args(process.argv)["group"] || config.tasks.postFont.defaultGroup;

    if (config.paths.hasOwnProperty(sourceGroup) && config.paths[sourceGroup]['font']) {
        const fontPath = config.paths[sourceGroup]['font'] + sourceFontName + '/';

        const fontCompress = new Fontmin()
            .src(`./${fontPath}*.${sourceExtension}`)
            .dest(`./${fontPath}/`);

        fontCompress.run(function (err, files) {
            if (err) {
                throw err;
            }

            del(`./${fontPath}*.css`).then(_ => {
                log(`Deleted following files: \n\r ./${fontPath}*.css`);
                done();
            });
        });
    } else {
        log(colors.yellow(`WARRING paths group '${sourceGroup}' not exist!`));
        done();
    }
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
