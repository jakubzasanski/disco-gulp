/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import Handlebars from 'handlebars';

// #####################################################################################################################

import config from '../config.js';
import fs from "fs";

// #####################################################################################################################

/**
 *
 */
function iconFont(done) {
    gulp.src(['assets/development/source/icons/test/*.svg'])
        .pipe(iconfont({
            fontName: 'test',
            prependUnicode: true,
            normalize: true,
            fontHeight: 1000,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            timestamp: Math.round(Date.now() / 1000),
        }))
        .on('glyphs', function (glyphs, options) {
            console.log(glyphs, options);
            // Create scss font data file
            const templateSCSS = fs.readFileSync('assets/development/source/icons/data.hbs')
            if (templateSCSS) {
                const template = Handlebars.compile(templateSCSS.toString());
                const result = template({
                    fontName: options.fontName,
                    fontVersion: options.timestamp,
                    fontGlyphs: glyphs
                });
                if (result) {
                    fs.writeFileSync('assets/development/source/scss/icon-font/_test.scss', result);
                }
            }
        })
        .pipe(gulp.dest('assets/public/icon-font/test/'))
        .on("end", _ => done());
}

// #####################################################################################################################

iconFont.displayName = 'icon-font';
iconFont.description = "";
export default iconFont;

// #####################################################################################################################

// EOF
