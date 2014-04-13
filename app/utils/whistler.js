// A whistler instance is responsible for:
//
// - Broadly, all socket-based communication on the client.
// - Polling the sockets server with the currentTime (`emit('progress')`)
// - Reload the player when the track URL changes.
// - Fire a `new_track` event when the Whistle server says that everyone's
//   ready to move to the next track.
var whistlers = {},
    SOCKET_OPTIONS = {
      'force new connection': true
    };

var Whistler = Ember.Object.extend(Ember.Evented, {
  roomId: null,
  '$audio': null,

  init: function() {
    this._super();

    var socket = io.connect(ENV.whistlePath, SOCKET_OPTIONS),
        $audio = this.get('$audio'),
        self = this;

    whistlers[self.get('roomId')] = self;

    self.set('socket', socket);
    socket.emit('join_room', self.get('roomId'));

    socket.on('new_track', function() {
      console.log('new track');
      self.trigger('didReceiveTrack');
    });

    socket.once('room_current_time', function(currentTime) {
      $audio[0].currentTime = currentTime;
    });

    $audio.one('loadedmetadata', function() {
      socket.emit('get_current_time');
    });

    $audio.one('loadedmetadata', function() {
      self.listenForProgress();
    });

    $audio.on('ended', function() {
      socket.emit('done_track');
    });
  },

  uploadedTrack: function() {
    this.get('socket').emit('uploaded_track');
  }.on('didUploadTrack'),

  changeSong: function(url) {
    var $audio = this.get('$audio'),
        $source = $audio.children('source');

    if (!url || ($source.attr('src') === url)) {
      return;
    }

    $source.attr('src', url);
    $audio[0].pause();
    $audio[0].load();
  },

  listenForProgress: function() {
    var $audio = this.get('$audio'),
        socket = this.get('socket');

    setInterval(function() {
      if ($audio[0].paused) { return; }
      socket.emit('progress', $audio[0].currentTime);
    }, 2000);
  }
});

Whistler.reopenClass({
  find: function(roomId) { return whistlers[roomId]; }
});

export default Whistler;
