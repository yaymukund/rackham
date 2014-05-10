var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource('room', { path: '/room/:room_id' });
  this.route('login', { path: '/login' });
  this.route('register', { path: '/register' });
});

export default Router;
