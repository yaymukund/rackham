export default Ember.Route.extend({
  setupController: function(controller) {
    var session = this.controllerFor('session');
    controller.set('currentUser', session.get('currentUser'));
  },

  beforeModel: function() {
    var session = this.controllerFor('session');

    if (session.get('isAuthenticated')) {
      this.transitionTo('index');
    }
  },

  actions: {
    authenticate: function() {
      var self = this,
          session = self.controllerFor('session'),
          credentials = {
            login: self.get('controller.login'),
            password: self.get('controller.password')
          };

      session.authenticate(credentials).then(function(response) {
        if (response.transition) {
          response.transition.retry();
        } else {
          self.transitionTo('index');
        }
      });
    }
  }
});
