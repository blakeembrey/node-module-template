/* global describe, it */
var expect   = require('chai').expect;
var template = require('./');

describe('upper case', function () {
  it('should do something cool', function () {
    expect(template()).to.equal('cool');
  });
});
