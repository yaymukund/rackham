import Whistler from 'rackham/utils/whistler';

export default Ember.Component.extend({
  reloadPlayer: function() {
    var self = this;

    Ember.run.once(function() {
      var url = self.get('track.url');
      self.get('whistler').changeSong(url);
    });
  }.observes('track.url'),

  setupWhistler: function() {
    var $audio = this.$('audio'),
        room = this.get('room'),
        whistler = Whistler.create({
          roomId: room.get('id'),
          '$audio': $audio
        });

    this.set('whistler', whistler);

    whistler.on('didReceiveTrack', function() {
      Ember.run(function() {
        room.reload();
      });
    });
  }.on('didInsertElement')
});
