import request from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel: function() {
    var session = this.controllerFor('session');

    if (session.get('isAuthenticated')) {
      this.send('cancel');
    }
  },

  createSession: function() {
    var session = this.controllerFor('session'),
        credentials = this.get('controller')
                          .getProperties('login', 'password');

    return request({
      type: 'POST',
      url: '/session',
      data: { user: credentials }
    }).then(function(payload) {
      session.loadUser(payload);
    });
  },

  actions: {
    authenticate: function() {
      var self = this,
          session = self.controllerFor('session');

      self.createSession().then(function() {
        var transition = session.get('previousTransition');

        if (transition) {
          transition.retry();
        } else {
          self.send('cancel');
        }
      }).catch(function(error) {
        self.send('displayError', error.jqXHR.responseText);
      });
    },

    cancel: function() {
      this.transitionTo('index');
    }
  }
});
