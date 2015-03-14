/* global describe, it */

var expect = require('chai').expect
var {{{moduleVariable}}} = require('./')

describe('{{{moduleSentence}}}', function () {
  it('should expose a function', function () {
    expect({{{moduleVariable}}}).to.be.a('function')
  })
})
