describe('Globals', function(){
  var provider;

  beforeEach(module('nag.globals', function(nagGlobalsProvider) {
    provider = nagGlobalsProvider;
  }));

  it('should return undefined when trying to access a property that has not been added', inject(function(nagGlobals) {
    expect(nagGlobals.value).to.be.undefined;
  }));

  it('should be able add and get values', inject(function(nagGlobals) {
    provider.addValue('value', {
      initialValue: 123
    });

    expect(nagGlobals.value).to.equal(123);
  }));

  it('should be able to modify value values', inject(function(nagGlobals) {
    provider.addValue('value', {
      initialValue: 123
    });
    nagGlobals.value = 'test';

    expect(nagGlobals.value).to.equal('test');
  }));

  it('should return default value if one is not set', inject(function(nagGlobals) {
    provider.addValue('value', {
      defaultValue: 123
    });

    expect(nagGlobals.value).to.equal(123);
  }));

  it('should be able to store multi-level objects', inject(function(nagGlobals) {
    provider.addValue('session', {
      initialValue: {}
    });
    nagGlobals.session.user = {
      id: 123,
      username: 'testuser'
    }

    expect(nagGlobals.session.user.id).to.equal(123);
    expect(nagGlobals.session.user.username).to.equal('testuser');
  }));

  it('should be able to set a setter validation function', inject(function(nagGlobals) {
    provider.addValue('value', {
      defaultValue: false,
      setterValidation: function(value) {
        return _.isBoolean(value);
      }
    });
    nagGlobals.value = 123;

    expect(nagGlobals.value).to.be.false;
  }));

  it('should be able add and get constants', inject(function(nagGlobals) {
    provider.addConstant('CONSTANT', 234);

    expect(nagGlobals.CONSTANT).to.equal(234);
  }));

  it('should not be able to modify constant values', inject(function(nagGlobals) {
    provider.addConstant('CONSTANT', 234);

    expect(function() {
      nagGlobals.CONSTANT = 'test';
    }).to.throw('setting a property that has only a getter');
  }));

  it('should be able to get value data from provider', inject(function() {
    provider.addValue('value', {
      initialValue: 123
    });

    expect(provider.getData('value')).to.equal(123);
  }));

  it('should be able to get constants data from provider', inject(function() {
    provider.addConstant('CONSTANT', 234);

    expect(provider.getData('CONSTANT')).to.equal(234);
  }));
});
