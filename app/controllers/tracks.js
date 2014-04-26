export default Ember.ArrayController.extend({
  itemController: 'track',
  sortProperties: ['trackOrder'],
  sortAscending: true,

  queuedTracks: Ember.computed.filter('content', function(track) {
    return !Ember.isEmpty(track.get('trackOrder'));
  }).property('content.@each.trackOrder'),

  unplayedTracks: Ember.computed.filter('arrangedContent', function(track) {
    return Ember.isEmpty(track.get('playedAt'));
  }).property('content.@each.playedAt'),

  currentTrack: Ember.computed.alias('unplayedTracks.firstObject')
});
