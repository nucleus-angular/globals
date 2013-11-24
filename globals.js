/**
 * This module contains global application data that needs to be available everywhere
 *
 * @module nag.globals
 * @ngservice nagGlobals
 */
angular.module('nag.globals', [])
.provider('nagGlobals', [
  function() {
    var data = {};
    var globals = {};

    var addConstant = function(key, value) {
      data[key] = value;

      Object.defineProperty(globals, key, {
        get: function() {
          return data[key] || undefined;
        }
      });
    };

    var addValue = function(key, options) {
      options = options || {};

      if(options.initialValue) {
        data[key] = options.initialValue;
      }

      Object.defineProperty(globals, key, {
        get: function() {
          return data[key] || options.defaultValue;
        },
        set: function(value) {
          var check = _.isFunction(options.setterValidation) ? options.setterValidation(value) : value;
          data[key] = check ? value : options.defaultValue;
        }
      });
    };

    return {
      $get: function() {
        return globals;
      },
      addConstant: addConstant,
      addValue: addValue,
      getData: function(key) {
        return globals[key];
      }
    };
  }
]);