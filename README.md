# Node Module Template

[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/node-module-template.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

Create my standard node module template.

**Psst! Install [`mversion`](https://github.com/mikaelbr/mversion) to automatically version and tag all package files by running `mversion [ major | minor | patch | prerelease | x.x.x-x ] -m`**

## Installation

```sh
npm install node-module-template -g
```

## Usage

```sh
node-module-template foobar

# Creating module...

cd foobar && ls
# bower.json
# package.json
# README.md
# ...
```

And you're good to go!

### Arguments

* `-h, --help` output usage information
* `-V, --version` output the version number
* `-a, --author [value]` set the author string
* `-l, --license [value]` set the module license
* `-u, --username [value]` set the repository github username
* `-r, --repo [value]` set the module repository name on github
* `-d, --dev` create a dev package

## Interesting Modules

### CLI

* [mversion](https://github.com/mikaelbr/mversion) `npm install mversion -g`
* [npm-dview](https://github.com/skratchdot/npm-dview) `npm install npm-dview -g`
* [notes](https://github.com/stephenb/node-notes) `npm install notes -g`
* [david](https://github.com/alanshaw/david) `npm install david -g`
* [serve](https://www.npmjs.com/package/serve) `npm install serve -g`
* [travis](https://github.com/travis-ci/travis.rb) `gem install travis`

### Dependencies

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
