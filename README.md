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

1. Remove any files that aren't neccessary to your configuration.
2. Update the package (`package.json` and `bower.json`) description and keywords.
3. Remove unnecessary dependencies and `npm install`
4. Add test cases
5. Implement module to pass test cases.
6. Repeat step 3 until module is complete.
7. Update README file.
8. `git init && git add . && git commit -a -m "initial commit"`
9. `npm publish` and/or `bower register [name] [url]`

### Arguments

* `-a, --author [value]`
* `-l, --license [value]`

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
