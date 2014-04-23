export default Ember.Controller.extend({
  user: null,
  previousTransition: null,
  isAuthenticated: Ember.computed.notEmpty('user'),

  loadUser: function(payload) {
    this.store.pushPayload('user', payload);
    var user = this.store.getById('user', payload.user.id);
    this.set('user', user);
  }
});
