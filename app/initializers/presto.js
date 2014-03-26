import App from 'app/app';

App.initializer({
  name: 'injectPresto',

  initialize: function(container, application) {
    App.presto = Presto.create({
      bucketUrl: $('meta[name=bucket-path]').attr('content'),
      policyUrl: $('meta[name=policy-path]').attr('content')
    });
  }
});
