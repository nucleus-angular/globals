module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '..',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    singleRun: true,
    files: [
      'components/lodash/dist/lodash.js',
      'components/angular/angular.js',
      'components/angular-mocks/angular-mocks.js',
      '*.js',
      'tests/*.js'
    ]
  });
};
