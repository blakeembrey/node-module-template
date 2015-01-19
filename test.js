/* global describe, it */
var assert    = require('assert');
var upperCase = require('./');

describe('upper case', function () {
  it('should upper case a string', function () {
    assert.equal(upperCase(null), '');
    assert.equal(upperCase('test'), 'TEST');
    assert.equal(upperCase('TEST'), 'TEST');
    assert.equal(upperCase('string'), 'STRING');
  });

  it('should support unicode', function () {
    assert.equal(upperCase('\u0131'), 'I');
  });

  it('should support locale override', function () {
    assert.equal(upperCase('i', 'tr'), '\u0130');
  });
});
