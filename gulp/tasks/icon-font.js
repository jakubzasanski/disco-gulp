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
import path from 'path';

const timestamp = Math.round(Date.now() / 1000);

// #####################################################################################################################

/**
 *
 */
function iconFont(done) {
    const fontName = 'test1';
    const pathGroup = 'system';
    const allPathGroup = true;

    if (allPathGroup) {
        let tasks = [];
        config.pathsGroup.forEach(_pathGroup => {
            const iconSets = fs.readdirSync(config.paths[_pathGroup].iconsSets, {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

            iconSets.forEach(_fontName => {
                tasks.push(new Promise((resolve) => {
                    generateIconFont(_fontName, _pathGroup, resolve);
                }));
            });
        });

        Promise.all(tasks).then(() => {
            fontsPreview();
            done();
        });

    } else {
        if (pathGroup && config.paths.hasOwnProperty(pathGroup)) {
            if (fontName) {
                generateIconFont(fontName, pathGroup, function () {
                    fontsPreview();
                    done();
                });
            } else {
                //
                console.log('error mising font name');
                done();
            }
        } else {
            //
            console.log('error mising font name');
            done();
        }
    }
}

/*
* Generate single font preview files
*/
function generateIconFont(_fontName, _pathGroup, callback) {

    const currentPaths = config.paths[_pathGroup];

    if (fs.existsSync(`${currentPaths.iconsSets}${_fontName}/`)) {

        const jsonMap = `${currentPaths.iconsSets}${_fontName}/map.json`;
        const jsonData = fs.existsSync(jsonMap) ? JSON.parse(fs.readFileSync(jsonMap)) : {};

        let lastUnicode = jsonData.lastUnicode ? jsonData.lastUnicode : 60000;
        const unicodeMap = jsonData.unicodeMap ? jsonData.unicodeMap : {};

        gulp.src(`${currentPaths.iconsSets}${_fontName}/*.svg`)
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
            .on("end", _ => callback());
    } else {
        console.log('nie ma fonta');
        callback();
    }
}

function test(aa, done) {
    console.log(aa);

    return aa;
}

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

/*
* Generate all avalible fonts preview file
*/
function fontsPreview() {

}

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

iconFont.displayName = 'icon-font';
iconFont.description = "";
export default iconFont;

// #####################################################################################################################

// EOF
