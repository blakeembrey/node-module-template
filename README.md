# Node Module Template

[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Create my standard node module template.

**P.S. Install [`mversion`](https://github.com/mikaelbr/mversion) to automatically version and tag all files with `mversion [ major | minor | patch | prerelease ] -m`**

## Installation

```sh
npm install node-module-template -g
```

## Usage

```sh
node-module-template upper-case

# Creating module...

cd upper-case && ls
# bower.json
# package.json
# README.md
# ...
```

And you're good to go!

### Arguments

* `-a, --author [value]` Set the author ("Blake Embrey <hello@blakeembrey.com>")
* `-l, --license [value]` Set the license ("Apache-2.0")

## Interesting Dependencies

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
[downloads-image]: https://img.shields.io/npm/dm/node-module-template.svg?style=flat
[downloads-url]: https://npmjs.org/package/node-module-template
