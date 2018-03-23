<a name="2.0.0"></a>
## [v2.0.0](https://github.com/futagoza/es-runtime/compare/v1.1.0...v2.0.0) (2018-03-23)

* Move `@babel/polyfill` and `@babel/runtime` to dependencies
* Remove `postinstall` lifecycle hook and `postinstall.js` CLI
* Add `es-runtime` CLI, a variant of the `postinstall.js` CLI
* Add the `--yarn` option to the CLI
* Ensure the lock-file is not edited/added when not using `--save`
* Rename the main file from `polyfill.js` to `index.js`
* Test on Travis only the latest versions of the LTS releases
* Update README.md
* Released: https://github.com/futagoza/es-runtime/releases/tag/v2.0.0

<a name="1.1.0"></a>
## [v1.1.0](https://github.com/futagoza/es-runtime/compare/v1.0.1...v1.1.0) (2018-01-11)

* Remove `--cwd` option, it is now the default unless `--module` is supplied
* Unless a `package.json` exists, don't run
* Ensure we don't run from `es-runtime` if it's the current working directory
* Released: https://github.com/futagoza/es-runtime/releases/tag/v1.1.0

<a name="1.0.1"></a>
## [v1.0.1](https://github.com/futagoza/es-runtime/compare/v1.0.0...v1.0.1) (2018-01-11)

* Ensure we don't run from within `es-runtime` unless it's under a `node_modules`
* Released: https://github.com/futagoza/es-runtime/releases/tag/v1.0.1

<a name="1.0.0"></a>
## [v1.0.0](https://github.com/futagoza/es-runtime/commits/v1.0.0) (2018-01-11)

Initial Release.

* Released: https://github.com/futagoza/es-runtime/releases/tag/v1.0.0
