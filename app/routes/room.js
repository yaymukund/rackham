import Whistler from 'rackham/utils/whistler';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    var session = this.controllerFor('session');

    if (!session.get('isAuthenticated')) {
      session.set('previousTransition', transition);
      this.transitionTo('login');
    }
  },

  actions: {
    createTrack: function(upload) {
      var attributes = upload.getProperties(
        'url',
        'title',
        'artist',
        'album'
      );

      var track = this.get('controller.tracks').createRecord(attributes);

      track.save().then(function(track) {
        var roomId = track.get('room.id');
        Whistler.find(roomId).trigger('didUploadTrack');
      });
    }
  }
});
