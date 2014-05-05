export default Ember.Controller.extend({
  error: null,
  warning: null,

  actions: {
    clearError: function() { this.set('error', null); },
    clearWarning: function() { this.set('warning', null); }
  }
});
