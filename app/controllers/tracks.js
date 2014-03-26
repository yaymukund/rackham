export default Ember.ArrayController.extend({
  itemController: 'track',

  needs: ['room'],
  content: Ember.computed.alias('controllers.room.tracks'),

  sortProperties: ['trackOrder'],
  sortAscending: true,

  queuedTracks: Ember.computed.filter('arrangedContent', function(track) {
    return Ember.isEmpty(track.get('playedAt')) &&
           !Ember.isEmpty(track.get('trackOrder'));
  }),

  currentTrack: Ember.computed.alias('queuedTracks.firstObject')
});
