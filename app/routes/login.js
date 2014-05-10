import request from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel: function() {
    var session = this.controllerFor('session');

    if (session.get('isAuthenticated')) {
      this.send('cancel');
    }
  },

  setupController: function(controller, model) {
    var registration = this.controllerFor('registration');
    registration.set('model', this.store.createRecord('user'));
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

  createUser: function() {
    var user = this.controllerFor('registration').get('model'),
        session = this.controllerFor('session');

    return user.save().then(function(user) {
      session.set('user', user);
    });
  },

  deactivate: function() {
    this.set('controller.password', null);
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

    register: function() {
      var self = this,
          registration = self.controllerFor('registration');

      self.createUser().then(function() {
        self.send('cancel');
      }).catch(function(error) {
        self.send('displayError', error.jqXHR.responseText);
      });
    },

    cancel: function() {
      this.transitionTo('index');
    }
  }
});
