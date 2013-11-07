describe('Globals', function(){
  var provider;

  beforeEach(module('nag.globals', function(globalsProvider) {
    provider = globalsProvider;
  }));

  it('should return undefined when trying to access a property that has not been added', inject(function(globals) {
    expect(globals.value).toBe(undefined);
  }));

  it('should be able add and get values', inject(function(globals) {
    provider.addValue('value', {
      initialValue: 123
    });

    expect(globals.value).toBe(123);
  }));

  it('should be able to modify value values', inject(function(globals) {
    provider.addValue('value', {
      initialValue: 123
    });
    globals.value = 'test';

    expect(globals.value).toBe('test');
  }));

  it('should return default value if one is not set', inject(function(globals) {
    provider.addValue('value', {
      defaultValue: 123
    });

    expect(globals.value).toBe(123);
  }));

  it('should be able to store multi-level objects', inject(function(globals) {
    provider.addValue('session', {
      initialValue: {}
    });
    globals.session.user = {
      id: 123,
      username: 'testuser'
    }

    expect(globals.session.user.id).toBe(123);
    expect(globals.session.user.username).toBe('testuser');
  }));

  it('should be able to set a setter validation function', inject(function(globals) {
    provider.addValue('value', {
      defaultValue: false,
      setterValidation: function(value) {
        return _.isBoolean(value);
      }
    });
    globals.value = 123;

    expect(globals.value).toBe(false);
  }));

  it('should be able add and get constants', inject(function(globals) {
    provider.addConstant('CONSTANT', 234);

    expect(globals.CONSTANT).toBe(234);
  }));

  it('should not be able to modify constant values', inject(function(globals) {
    provider.addConstant('CONSTANT', 234);

    expect(function() {
      globals.CONSTANT = 'test';
    }).toThrow(new Error("setting a property that has only a getter"));
  }));
});
