/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import args from 'minimist';
import del from "del";
import colors from "ansi-colors";
import Fontmin from 'fontmin';
import log from 'fancy-log';


// #####################################################################################################################

import config from '../config.js';

// #####################################################################################################################

/**
 * Convert and compress font files
 * @param done
 */
function postFont(done) {
    const sourceFontName = args(process.argv)["name"];
    const sourceExtension = args(process.argv)["ext"];
    const pathGroup = args(process.argv)["group"];

    if(sourceFontName) {
        if (sourceExtension) {
            if (pathGroup) {
                if (config.paths.hasOwnProperty(pathGroup) && config.paths[pathGroup]['font']) {
                    const fontPath = config.paths[pathGroup]['font'] + sourceFontName + '/';

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
                    log(colors.yellow(`WARRING paths group '${pathGroup}' not exist!`));
                    done();
                }
            } else {
                log(colors.red(`ERROR: Undefined pathGroup, missing \`group\` argument.`));
                done();
            }
        } else {
            log(colors.red(`ERROR: Undefined font file ext, missing \`ext\` argument.`));
            done();
        }
    }
    else{
        log(colors.red(`ERROR: Undefined font name, missing \`name\` argument.`));
        done();
    }
}

// #####################################################################################################################

postFont.displayName = "post-font";
postFont.description = "Convert and minify font files.";
postFont.flags = {
    '--name': 'Set source name',
    '--ext': 'Set source extension',
    '--group': 'Set source path group'
};
export {postFont};
export default postFont;

// #####################################################################################################################

// EOF
