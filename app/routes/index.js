export default Ember.Route.extend({
  beforeModel: function() {
    var room = this.store.find('room', 1);
    this.transitionTo('room', room));
  }
});
