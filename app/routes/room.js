import Whistler from 'rackham/utils/whistler';

export default Ember.Route.extend({
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
        upload.resolve();
      }).catch(function(error) {
        upload.error();
      });
    }
  }
});
