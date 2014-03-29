import Whistler from 'rackham/utils/whistler';

export default Ember.Route.extend({
  actions: {
    createTrack: function(attributes) {
      var track = this.get('controller.tracks').createRecord(attributes);

      track.save().then(function() {
        Whistler.emit('uploaded_track');
      });
    }
  }
});
