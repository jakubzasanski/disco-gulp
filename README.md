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
│ │ --dart        …Use native Dart SDK
│ └─┬ <series>
│   └─┬ <parallel>
│     ├─┬ <series>
│     │ ├── sass-compile
│     │ └── post-css
│     └─┬ <series>
│       ├── js-transpile
│       └── post-js
├─┬ default
│ └─┬ <series>
│   └── welcome
├── welcome       Prints welcome section to the console.
├── icon-font
├── js-transpile  Transpile JavaScript to most supported version.
├── post-css      Add prefixes and compress css.
├── post-font     Convert and minify font files.
│   --name        …Set source name
│   --source      …Set source extension
├── post-js       Add prefixes and compress css.
├── sass-compile  Compile scss to css files.
│   --dart        …Use native Dart SDK
└── watch         Compiles scss files and transpiles js files in real time.
    --dart        …Use native Dart SDK
```

---

Like my work? Buy me a beer! 🍺

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?hosted_button_id=KWNT5X4DUL2AY)
