export default Ember.Controller.extend({
  user: null,
  isLoggedIn: Ember.computed.notEmpty('user'),

  loadUser: function(payload) {
    var user, store = this.store;

    store.pushPayload('user', payload);
    user = store.getById('user', payload.user.id);
    this.set('user', user);

    if (this.get('previousTransition')) {
      this.get('previousTransition').retry();
      this.set('previousTransition', null);
    } else {
      this.transitionToRoute('index');
    }

    return user;
  }
});
