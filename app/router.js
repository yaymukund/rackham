var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'history'
});

Router.map(function() {
  this.resource('room', { path: '/room/:room_id' });
});

export default Router;
