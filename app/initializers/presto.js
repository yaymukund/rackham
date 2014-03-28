import App from 'rackham/app';
import Presto from 'presto';

App.initializer({
  name: 'injectPresto',

  initialize: function(container, application) {
    App.presto = Presto.create({
      bucketUrl: $('meta[name=bucket-path]').attr('content'),
      policyUrl: $('meta[name=policy-path]').attr('content')
    });
  }
});
