export default Ember.ArrayController.extend({
  itemController: 'track',

  needs: ['room'],

  sortProperties: ['trackOrder'],
  sortAscending: true,

  tracks: Ember.computed.alias('controllers.room.tracks'),

  content: Ember.computed.filter('tracks', function(track) {
    return !Ember.isEmpty(track.get('trackOrder'));
  }).property('tracks.@each.trackOrder'),

  queuedTracks: Ember.computed.filter('arrangedContent', function(track) {
    return Ember.isEmpty(track.get('playedAt'));
  }),

  currentTrack: Ember.computed.alias('queuedTracks.firstObject')
});
