export default Ember.ObjectController.extend({
  needs: ['tracks'],
  currentTrack: Ember.computed.alias('controllers.tracks.currentTrack')
});
