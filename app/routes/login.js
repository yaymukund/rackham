import { request } from 'ic-ajax';

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

      request({
        type: 'POST',
        url: '/session',
        data: { user: credentials }
      }).then(function(payload) {
        session.loadUser(payload);

        var transition = session.get('previousTransaction');

        if (transition) {
          transition.retry();
        } else {
          self.transitionTo('index');
        }
      })
    }
  }
});
