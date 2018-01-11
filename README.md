_es-runtime_ simply ensures @babel/(runtime && polyfill) are installed correctly. Why is this useful?
If you still use Node.js v4, then it's a no brainer, but if you use Node.js v6+, then it's for a simpler setup.

### install

```
npm install es-runtime --save
```

### usage

_es-runtime_ will automatically be used on the _postinstall_ lifecycle script in your distributed package, but first:

1. You create an ES2015+ module(s)

2. You use one of (or both) in your `.babelrc(.js)` config:

    - `@babel/plugin-transform-runtime`
    - `@babel/preset-env` with `useBuiltIns` enabled

3. You transpile your module(s) with Babel 7+

4. You ensure: `es-runtime` is in your package's `dependencies` field

5. Your transpiled code should find `core-js` and/or `regenerator-runtime`, even on Node.js v4

### command line usage

You can also use _es-runtime_ during development or in other npm scripts by calling the cli: `es-runtime`

The following options are supported (there are no short flags):

- `--silent` disable's the debug message's that are shown always on `npm install`
- `--cwd` set's the current working directory as the module directory
- `--module` manually set the module directory (must be a path from the current working directory)
- `--save` will let `npm install` update your `package.json` (otherwise it is restored automatically)

### optional

If you want to set a required version for one of (or all):

- @babel/polyfill
- @babel/runtime
- core-js
- regenerator-runtime

Then as usual, just set it in your package's `dependencies` field and _es-runtime_ will install that version instead.
