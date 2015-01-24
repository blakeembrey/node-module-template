/* global describe, it */
var expect = require('chai').expect;
var {{{moduleVariable}}} = require('./');

describe('{{{moduleSentence}}}', function () {
  it('should do something', function () {
    expect({{{moduleVariable}}}()).to.equal('Hello world!');
  });
});
