/* global describe, it */
var expect   = require('chai').expect;
var template = require('./');

describe('node module template', function () {
  it('should do something cool', function () {
    expect(template()).to.equal('cool');
  });
});
