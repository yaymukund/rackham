import Whistler from 'rackham/utils/whistler';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    var session = this.controllerFor('session');

    if (!session.get('isAuthenticated')) {
      session.set('previousTransition', transition);
      this.transitionTo('login');
    }
  },

  setupController: function(controller, model) {
    this.controllerFor('tracks').set('content', model.get('tracks'));
    this._super(controller, model);
  },

  deactivate: function() {
    var roomId = this.get('controller.id');
    Whistler.find(roomId).trigger('didLeaveRoom')
  },

  actions: {
    createTrack: function(attributes) {
      var track = this.get('controller.tracks').createRecord(attributes);

      track.save().then(function(track) {
        var roomId = track.get('room.id');
        Whistler.find(roomId).trigger('didUploadTrack');
      });
    }
  }
});
