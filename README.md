Example gulpfile.js with separate tasks in multiple files.
Provides frontend environment and tools for web development.
Support multiple configurable assets paths (etc. `system/assets/`, `admin/assets/`)

![version](https://img.shields.io/github/v/tag/jakubzasanski/disco-gulp?label=version)
![license](https://img.shields.io/github/license/jakubzasanski/disco-gulp)

---

### Features
- SCSS compiler (Dart Sass)
- Js transpiler (Babel)
- CSS & Js minifying (CSSNano & Uglify)
- CSS autoprefixer
- Source maps
- Images and SVGs compress
- Icon font generator
- Minify font

### Tasks

```text
├─┬ build         Optimize your project for production
│ │ --engine      …Choose engine dart|dart-js
│ └─┬ <parallel>
│   ├─┬ <series>
│   │ ├── sass-compile
│   │ └── post-css
│   ├─┬ <series>
│   │ ├── js-transpile
│   │ └── post-js
│   └── post-images
├─┬ default
│ └─┬ <series>
│   └── disco
├── disco         Prints disco.
├── icon-font     Generate iconfont from svg files
│   --all         …generate all icon fonts
│   --group       …set path group
│   --name        …set iconfont name
├── js-transpile  Transpile JavaScript to most supported version.
├── post-css      Add prefixes and compress css.
├── post-font     Convert and minify font files.
│   --ext         …Set source extension
│   --group       …Set source path group
│   --name        …Set source name
├── post-images   Optimize your project images for production
├── post-js       Compress js files.
├── sass-compile  Compile scss to css files.
│   --engine      …Choose engine dart|dart-js
└── watch         Compiles scss files and transpiles js files in real time.
    --engine      …Choose engine dart|dart-js
```
