export default Ember.Mixin.create({
  beforeModel: function(transition) {
    var session = this.controllerFor('session'),
        json = $('meta[name="current-user"]').attr('content');

    if (json) {
      session.loadUser(JSON.parse(json));
    }

    this._super(transition);
  }
});
