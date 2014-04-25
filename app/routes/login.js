import request from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel: function() {
    var session = this.controllerFor('session');

    if (session.get('isAuthenticated')) {
      this.send('cancel');
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

        var transition = session.get('previousTransition');

        if (transition) {
          transition.retry();
        } else {
          self.send('cancel');
        }
      })
    },

    cancel: function() {
      this.transitionTo('index');
    }
  }
});
