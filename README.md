# Node Module Template

[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

My standard node module template.

**P.S. Install [`mversion`](https://github.com/mikaelbr/mversion) to automatically version and tag all files with `mversion [ major | minor | patch | prerelease ] -m`**

## Installation

```sh
npm install node-module-template --save
```

## Usage

```js
var template = require('node-module-template');

template('hello world!'); //=> "HELLO WORLD!"
```

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
