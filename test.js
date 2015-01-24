/* global describe, it */
var expect   = require('chai').expect;
var template = require('./');

describe('node module template', function () {
  it('should say hello', function () {
    expect(template()).to.equal('Hello world!');
  });
});
