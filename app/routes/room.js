import Whistler from 'rackham/utils/whistler';

export default Ember.Route.extend({
  actions: {
    createTrack: function(attributes) {
      var track = this.get('controller.tracks').createRecord(attributes);

      track.save().then(function() {
        var roomId = this.get('room.id');
        Whistler.find(roomId).emit('uploaded_track');
      });
    }
  }
});
