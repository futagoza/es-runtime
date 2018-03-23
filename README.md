[![Build status](https://api.travis-ci.org/futagoza/es-runtime.svg)](https://travis-ci.org/futagoza/es-runtime)
[![npm version](https://img.shields.io/npm/v/es-runtime.svg)](https://www.npmjs.com/package/es-runtime)
[![dependencies](https://img.shields.io/david/futagoza/es-runtime.svg)](https://david-dm.org/futagoza/es-runtime)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_es-runtime_ simply tries to ensure _@babel/(runtime && polyfill)_ are installed correctly. Why is this useful?
If you still use Node.js v4, then it's a no brainer, but if you use Node.js v6+, then it's for a simpler setup.

### install

```sh
$ npm i es-runtime
```

or

```sh
$ yarn add es-runtime
```

### api

There is no API, but if you use `require( "es-runtime" )` or `import "es-runtime"`, then `@babel/polyfill` will be used automatically.

### usage

_es-runtime_ can be simply used by calling the `es-runtime` CLI, and it is recommended to add this to your `postinstall`, `bootstrap` or `setup` scripts within _package.json_, but to ensure everything works, you must:

1. Use one of (or both) in your `.babelrc(.js)` config:

    - `@babel/plugin-transform-runtime`
    - `@babel/preset-env` with `useBuiltIns` enabled

2. Transpile your module(s) with Babel 7+

3. Ensure `es-runtime` is in your package's `dependencies` field, __NOT `devDependencies`__

4. Try to always use the latest version of the Node.js release your using (e.g. _4.8_ instead of _4.0_)

5. NPM 3+, or Yarn are recommended, and tested with, so no guarantee whatsoever that others work

6. Only use this with directories that have a `package.json`, otherwise it will throw an error

### options

The following options are supported (there are no short flags):

- `--silent` disable's the debug message's (recommended if you use `es-runtime` in your _package.json_)
- `--module` manually set the module directory (must be a path from the current working directory)
- `--save` will let `npm install` update your `package.json` and the lock-file, otherwise they are restored
- `--yarn` will use `yarn add` instead of `npm install`

### optional

If you want to set a required version for one of (or all):

- @babel/polyfill
- @babel/runtime
- core-js
- regenerator-runtime

As usual, just set it in your package's `dependencies` field and _es-runtime_ will try to install that version instead.
