/* global describe, it */

var expect = require('chai').expect
var {{{moduleVariable}}} = require('./index')

describe('{{{moduleSentence}}}', function () {
  it('should export a function', function () {
    expect({{{moduleVariable}}}).to.be.a('function')
  })
})
