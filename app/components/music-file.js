export default Ember.Component.extend({
  reloadPlayer: function() {
    var self = this;

    Ember.run.once(function() {
      var url = self.get('track.url');
      Whistler.changeSong(url);
    });

  }.observes('track.url'),

  setupWhistler: function() {
    var $audio = this.$('audio'),
        self = this;

    Whistler.bindTo(this.get('room.id'), $audio);

    Whistler.on('new_track', function() {
      Ember.run(function() {
        self.get('room').reload();
      });
    });
  }.on('didInsertElement')
});
