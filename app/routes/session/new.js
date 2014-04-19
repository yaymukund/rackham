export default Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('session').get('isLoggedIn')) {
      this.transitionTo('index');
    }
  },

  actions: {
    authenticate: function() {
      var session = this.controllerFor('session'),
          credentials = this.get('controller')
                            .getProperties('login', 'password');

      var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        $.ajax({
          type: 'POST',
          url: '/sessions',
          data: { user: credentials }
        }).done(resolve).fail(reject);
      });

      promise.then(function(payload) {
        session.loadUser(payload);
      });

      return promise;
    }
  }
});
