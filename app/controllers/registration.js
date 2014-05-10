export default Ember.ObjectController.extend({
  hasLogin: Ember.computed.notEmpty('login'),
  hasEmail: Ember.computed.notEmpty('email'),
  hasPassword: Ember.computed.notEmpty('password'),
  hasConfirmedPassword: function() {
    return this.get('password') === this.get('passwordConfirmation');
  }.property('password', 'passwordConfirmation'),
  hasError: Ember.computed.notEmpty('error'),
  error: function() {
    if (this.get('isValid')) { return null; }
    if (!this.get('hasLogin')) { return 'Login cannot be blank.'; }
    if (!this.get('hasEmail')) { return 'Email cannot be blank.'; }
    if (!this.get('hasPassword')) { return 'Password cannot be blank.'; }
    if (!this.get('hasConfirmedPassword')) { return 'Password must match the password confirmation.'; }
  }.property('hasLogin', 'hasEmail', 'hasPassword', 'hasConfirmedPassword', 'isValid'),

  actions: {
    register: function() {
      if (this.get('hasError')) {
        var error = this.get('error');
        this.send('displayError', error);
      } else {
        return true;
      }
    }
  }
});
