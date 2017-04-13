// Based on boilerplate code at https://github.com/lelandrichardson/enzyme-example-mocha
require('babel-register')();
require ('babel-polyfill');
const chai = require('chai');
const chaiGen = require('chai-generator');
const hook = require('css-modules-require-hook');

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
chai.use(chaiGen);
global.expect = chai.expect;
global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
