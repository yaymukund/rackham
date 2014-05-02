/* global require, module */

var uglifyJavaScript = require('broccoli-uglify-js');
var replace = require('broccoli-replace');
var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var env = require('broccoli-env').getEnv();
var getConfigJSON = require('./config/config');

var p = require('ember-cli/lib/preprocessors');
var preprocessCss = p.preprocessCss;
var preprocessTemplates = p.preprocessTemplates;
var preprocessJs = p.preprocessJs;

module.exports = function (broccoli) {

  var prefix = 'rackham';
  var rootURL = '/';
  var envJSON = getConfigJSON.bind(null, env);

  // env.js
  var envJS = pickFiles('config', {
    srcDir: '/',
    files: ['env.js'],
    destDir: '/assets/'
  });

  envJS = replace(envJS, {
    files: ['assets/env.js'],
    patterns: [{ match: /\{\{ENV\}\}/g, replacement: envJSON }]
  });

  // index.html

  var indexHTML = pickFiles('app', {
    srcDir: '/',
    files: ['index.html'],
    destDir: '/'
  });

  // sourceTrees, appAndDependencies for CSS and JavaScript

  var app = pickFiles('app', {
    srcDir: '/',
    destDir: prefix
  });

  app = preprocessTemplates(app);

  var config = pickFiles('config', { // Don't pick anything, just watch config folder
    srcDir: '/',
    files: [],
    destDir: '/'
  });

  var sourceTrees = [app, config, 'vendor'].concat(broccoli.bowerTrees());
  var appAndDependencies = mergeTrees(sourceTrees, { overwrite: true });

  // JavaScript

  var legacyFilesToAppend = [
    'jquery.js',
    'handlebars.js',
    'ember.js',
    'ic-ajax/dist/named-amd/main.js',
    'ember-data.js',
    'ember-resolver.js',
    'ember-shim.js'
  ];

  var applicationJs = preprocessJs(appAndDependencies, '/', prefix);

  applicationJs = compileES6(applicationJs, {
    loaderFile: 'loader/loader.js',
    ignoredModules: [
      'id3',
      'ember/resolver',
      'ic-ajax'
    ],
    inputFiles: [
      prefix + '/**/*.js'
    ],
    legacyFilesToAppend: legacyFilesToAppend,
    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  });

  if (env === 'production') {
    applicationJs = uglifyJavaScript(applicationJs, {
      mangle: false,
      compress: false
    });
  }

  // Styles

  var styles = preprocessCss(sourceTrees, prefix + '/styles', '/assets');
  var mobileStyles = pickFiles('app', {
    srcDir: '/styles',
    files: ['mobile.css'],
    destDir: '/assets'
  });

  // Ouput

  var outputTrees = [
    indexHTML,
    envJS,
    applicationJs,
    'public',
    styles,
    mobileStyles
  ];

  // Testing

  if (env !== 'production') {

    var tests = pickFiles('tests', {
      srcDir: '/',
      destDir: prefix + '/tests'
    });

    var testsIndexHTML = pickFiles('tests', {
      srcDir: '/',
      files: ['index.html'],
      destDir: '/tests'
    });

    var qunitStyles = pickFiles('vendor', {
      srcDir: '/qunit/qunit',
      files: ['qunit.css'],
      destDir: '/assets/'
    });

    testsIndexHTML = replace(testsIndexHTML, {
      files: ['tests/index.html'],
      patterns: [{ match: /\{\{ENV\}\}/g, replacement: getConfigJSON.bind(null, env)}]
    });

    tests = preprocessTemplates(tests);

    sourceTrees = [tests, 'vendor'].concat(broccoli.bowerTrees());
    appAndDependencies = mergeTrees(sourceTrees, { overwrite: true });

    var testsJs = preprocessJs(appAndDependencies, '/', prefix);

    var legacyTestFiles = [
      'qunit/qunit/qunit.js',
      'qunit-shim.js',
      'ember-qunit/dist/named-amd/main.js'
    ];

    legacyFilesToAppend = legacyFilesToAppend.concat(legacyTestFiles);

    testsJs = compileES6(testsJs, {
      // Temporary workaround for
      // https://github.com/joliss/broccoli-es6-concatenator/issues/9
      loaderFile: '_loader.js',
      ignoredModules: [
        'ember/resolver',
        'ember-qunit'
      ],
      inputFiles: [
        prefix + '/**/*.js'
      ],
      legacyFilesToAppend: legacyFilesToAppend,

      wrapInEval: true,
      outputFile: '/assets/tests.js'
    });

    var testsTrees = [qunitStyles, testsIndexHTML, testsJs];
    outputTrees = outputTrees.concat(testsTrees);
  }

  return mergeTrees(outputTrees, { overwrite: true });
};
