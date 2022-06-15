/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import Handlebars from 'handlebars';
import fs from "fs";
import path from 'path';
import plumber from "gulp-plumber";
import colors from "ansi-colors";
import log from 'fancy-log';

// #####################################################################################################################

import errorHandler from "../helpers/error-handler.js";
import config from '../config.js';

// #####################################################################################################################

const timestamp = Math.round(Date.now() / 1000);

// #####################################################################################################################

/*
* Generate iconfont from svg icons
*/
function iconFont(done) {
    const fontName = 'test';
    const pathGroup = 'system';
    const allPathGroup = false;

    if (allPathGroup) {
        let tasks = [];
        config.pathsGroup.forEach(_pathGroup => {
            const iconSets = fs.readdirSync(config.paths[_pathGroup].iconsSets, {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

            if (iconSets.length > 0) {
                iconSets.forEach(_fontName => {
                    tasks.push(new Promise((resolve) => {
                        generateIconFont(_fontName, _pathGroup, resolve);
                    }));
                });
            } else {
                log(colors.yellow(`WARRING: not found fonts in path group \`${_pathGroup}\``));
            }
        });

        Promise.all(tasks).then(() => {
            fontsPreview();
            done();
        });

    } else {
        if (pathGroup) {
            if(config.paths.hasOwnProperty(pathGroup)) {
                if (fontName) {
                    generateIconFont(fontName, pathGroup, function () {
                        fontsPreview();
                        done();
                    });
                } else {
                    done(new Error(colors.red(`Missing '--name' argument`)));
                }
            }
            else{
                done(new Error(colors.red(`Following path group \`${pathGroup}\` not exist`)));
            }
        } else {
            done(new Error(colors.red(`Missing '--path' argument`)));
        }
    }
}

// #####################################################################################################################

/*
* Generate icon font
*/
function generateIconFont(_fontName, _pathGroup, callback) {

    const currentPaths = config.paths[_pathGroup];

    if (fs.existsSync(`${currentPaths.iconsSets}${_fontName}/`)) {

        const jsonMap = `${currentPaths.iconsSets}${_fontName}/map.json`;
        const jsonData = fs.existsSync(jsonMap) ? JSON.parse(fs.readFileSync(jsonMap)) : {};

        let lastUnicode = jsonData.lastUnicode ? jsonData.lastUnicode : 60000;
        const unicodeMap = jsonData.unicodeMap ? jsonData.unicodeMap : {};

        gulp.src(`${currentPaths.iconsSets}${_fontName}/*.svg`)
            .pipe(plumber({
                errorHandler: errorHandler
            }))
            .pipe(iconfont({
                fontName: `${_pathGroup}-${_fontName}`,
                metadataProvider: function (file, cb) {
                    const fileName = path.basename(file, path.extname(file))
                    cb(false, {
                        name: fileName,
                        unicode: [String.fromCodePoint((unicodeMap[fileName]) ? unicodeMap[fileName] : ++lastUnicode)]
                    });
                },
                normalize: true,
                fontHeight: 1000,
                formats: ['eot', 'svg', 'ttf', 'woff', 'woff2'],
                timestamp: timestamp,
            }))
            .on('glyphs', function (glyphs, options) {

                const mapData = fontMap(glyphs);

                fs.writeFileSync(jsonMap, JSON.stringify(mapData.json));

                const data = {
                    fontName: options.fontName,
                    fontVersion: options.timestamp,
                    fontPrefix: `icon-font-${options.fontName}`,
                    fontGlyphs: mapData.glyphs
                };

                fontData(_fontName, _pathGroup, data);
                fontPreview(_fontName, _pathGroup, data);
            })
            .pipe(gulp.dest(`${currentPaths.iconsFont}${_fontName}/`))
            .on("end", function(){
                log(colors.cyan(`Successful created font \`${_pathGroup}-${_fontName}\` in ${currentPaths.iconsFont}${_fontName}/`));
                callback();
            });
    } else {
        callback(new Error(colors.red(`Following path \`${`${currentPaths.iconsSets}${_fontName}/` }\` not exist`)));
    }
}

// #####################################################################################################################

/*
* Generate icon font map
*/
function fontMap(glyphs) {
    let iconsMap = {
        json: {
            lastUnicode: 0,
            unicodeMap: {}
        },
        glyphs: {}
    };

    glyphs.forEach(function (glyph) {
        const code = glyph.unicode[0].charCodeAt(0);
        if (code > iconsMap.json.lastUnicode) {
            iconsMap.json.lastUnicode = code;
        }
        iconsMap.json.unicodeMap[glyph.name] = code;
        iconsMap.glyphs[glyph.name] = "\\" + code.toString(16).toUpperCase();
    })

    return iconsMap;
}

// #####################################################################################################################

/*
* Generate scss icon font data and map file
*/
function fontData(_fontName, _pathGroup, data) {
    const currentPaths = config.paths[_pathGroup];

    const templateSCSS = fs.readFileSync(`${currentPaths.iconsTemplate}data.hbs`)
    if (templateSCSS) {
        const template = Handlebars.compile(templateSCSS.toString());
        const result = template(data);
        if (result) {
            fs.writeFileSync(`${currentPaths.iconsScss}_${_fontName}.scss`, result);
        }
    }
}

// #####################################################################################################################

/*
* Generate single font preview files
*/
function fontPreview(_fontName, _pathGroup, data) {

    const currentPaths = config.paths[_pathGroup];

    const dirPreview = `${currentPaths.iconsPreview}${_fontName}/`;

    if (!fs.existsSync(dirPreview)) {
        fs.mkdirSync(dirPreview, {recursive: true});
    }

    data.fontPath = (path.relative(dirPreview, currentPaths.iconsFont + _fontName + '/') + '/').replaceAll("\\", "/");

    const templatePreviewCss = fs.readFileSync(`${currentPaths.iconsTemplate}preview_css.hbs`)
    if (templatePreviewCss) {
        const previewCss = Handlebars.compile(templatePreviewCss.toString());
        const resultPreviewCss = previewCss(data);
        if (resultPreviewCss) {
            fs.writeFileSync(`${dirPreview}style.css`, resultPreviewCss);
        }
    }

    const templatePreviewHtml = fs.readFileSync(`${currentPaths.iconsTemplate}preview_html.hbs`)
    if (templatePreviewHtml) {
        const previewHtml = Handlebars.compile(templatePreviewHtml.toString());
        const resultPreviewHtml = previewHtml(data);
        if (resultPreviewHtml) {
            fs.writeFileSync(`${dirPreview}index.html`, resultPreviewHtml);
        }
    }
}

// #####################################################################################################################

/*
* Generate all avalible fonts preview file
*/
function fontsPreview() {

}

// #####################################################################################################################

iconFont.displayName = 'icon-font';
iconFont.description = "Generate iconfont from svg files";
iconFont.flags = {
    '--name': 'set iconfont name',
    '--group': 'set path group',
    '--all': 'generate all icon fonts'
};
export default iconFont;

// #####################################################################################################################

// EOF
