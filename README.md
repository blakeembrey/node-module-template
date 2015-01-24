# Node Module Template

[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Create my standard node module template.

**P.S. Install [`mversion`](https://github.com/mikaelbr/mversion) to automatically version and tag all files with `mversion [ major | minor | patch | prerelease ] -m`**

## Installation

```sh
npm install node-module-template -g
```

## Usage

```sh
node-module-template upper-case

cd upper-case
ls
# bower.json
# package.json
# README.md
# ...
```

1. Remove any files that aren't neccessary to your configuration.
2. Update the package (`package.json` and `bower.json`) description and keywords.
3. Add test cases
4. Implement module to pass test cases.
5. Repeat step 3 until module is complete.
6. Update README file.
7. `npm publish` and/or `bower register [name] [url]`

## Dependencies

* [Bunyan](https://github.com/trentm/node-bunyan) `npm install bunyan --save`
* [Express](https://github.com/strongloop/express) `npm install express --save`
* [VError](https://github.com/davepacheco/node-verror) `npm install verror --save`
* [Popsicle](https://github.com/blakeembrey/popsicle) `npm install popsicle --save`
* [Debug](https://github.com/visionmedia/debug) `npm install debug --save`
* [Browserify](https://github.com/substack/node-browserify) `npm install browserify --save-dev`
* [Karma](https://github.com/karma-runner/karma) `npm install karma --save-dev`
* [Gulp](https://github.com/gulpjs/gulp) `npm install gulp --save-dev`

## License

MIT

[npm-image]: https://img.shields.io/npm/v/node-module-template.svg?style=flat
[npm-url]: https://npmjs.org/package/node-module-template
[travis-image]: https://img.shields.io/travis/blakeembrey/node-module-template.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/node-module-template
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/node-module-template.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/node-module-template?branch=master
[downloads-image]: https://img.shields.io/npm/dm/node-module-template.svg?style=flat
[downloads-url]: https://npmjs.org/package/node-module-template
