export default Ember.Controller.extend({
  user: null,
  store: null,
  previousTransition: null,
  isAuthenticated: Ember.computed.notEmpty('user'),

  loadUser: function(payload) {
    var user, store = this.store;

    store.pushPayload('user', payload);
    user = store.getById('user', payload.user.id);
    this.set('user', user);
    return user;
  },

  authenticate: function(credentials) {
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax({
        type: 'POST',
        url: '/session',
        data: { user: credentials }

      }).done(function(payload) {
        var transition = self.get('previousTransition'),
            user = self.loadUser(payload);

        self.set('previousTransition', null);
        resolve({ user: user, transition: transition });
      }).fail(reject);
    });
  }
});

