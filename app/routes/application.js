export default Ember.Route.extend({
  beforeModel: function(transition) {
    var store = this.store,
        session = this.controllerFor('session'),
        json = $('meta[name="current-user"]').attr('content');

    if (json) {
      session.loadUser(JSON.parse(json));
    }
  }
});
