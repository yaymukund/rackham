export default Ember.ObjectController.extend({
  isPlaying: function() {
    return this.get('parentController.currentTrack') === this.get('model');
  }.property('parentController.currentTrack'),

  hasPlayed: Ember.computed.notEmpty('playedAt')
});
