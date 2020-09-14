# ui5-compatible-webpack-build

Plugin adding support for the OpenUI5/SAPUI5 module system in webpack build artifacts.

Have you ever wanted to load the result of a webpack build into a UI5 file? If so, this plugin is for you.

# Installing

1. Add the package to your repo
```bash
# on your project generating the webpack build:
yarn add -D ui5-compatible-webpack-build
```
2. Add the plugin to your `webpack.config.js`:

```js
// ... your imports
const { UI5ModuleForUmdPlugin } = require('ui5-compatible-webpack-build');

module.exports = function(webpackEnv) {
  return {
    // ... your config ...
    output: {
      path: 'dist/',
      filename: 'static/js/bundle.js',
      library: 'your-library-name', // REQUIRED
      libraryTarget: 'umd', // REQUIRED
    },
    plugins: [
      new UI5ModuleForUmdPlugin(),
      // be aware that you wouldn't use HtmlWebpackPlugin when you use the UI5ModuleForUmdPlugin plugin,
      // as your entrypoint should be a JS file that can be imported into UI5, not a html.
      // ... your other plugins ...
    ]
  }
```

3. Use the output file as you see fit

# Sample repo

TODO.

# Caveats

This repository is using Webpack 4 hooks, but when Webpack 5 comes out, it will have to be changed to use the new JavascriptModules hooks. Only to avoid using deprecated code, as it will still work.

# References

https://github.com/nhn/tui.webpack.safe-umd-plugin : I read this repo to understand how to hook into the UMD building phase.

https://github.com/johnagan/clean-webpack-plugin : I read this repo to understand how to make a Webpack plugin in TypeScript.

# License

The MIT License

Copyright (c) 2020 Gabriel Borges

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
