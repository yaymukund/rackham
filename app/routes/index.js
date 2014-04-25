export default Ember.Route.extend({
  setupController: function(controller, model) {
    var rooms = this.store.find('room');
    this.controllerFor('rooms').set('model', rooms);
  }
});
