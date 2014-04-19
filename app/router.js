var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource('room', { path: '/room/:room_id' });

  this.resource('session', function() {
    this.route('new');
  });
});

export default Router;
