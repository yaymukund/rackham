import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'rackham', // TODO: loaded via config
  Resolver: Resolver['default']
});

App.initializer({
  name: 'injectPresto',

  initialize: function(container, application) {
    App.presto = Presto.create({
      bucketUrl: $('meta[name=bucket-path]').attr('content'),
      policyUrl: $('meta[name=policy-path]').attr('content')
    });
  }
});

export default App;
