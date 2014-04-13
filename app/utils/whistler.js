// A whistler instance is responsible for:
//
// - Broadly, all socket-based communication on the client.
// - Polling the sockets server with the currentTime (`emit('progress')`)
// - Reload the player when the track URL changes.
// - Fire a `new_track` event when the Whistle server says that everyone's
//   ready to move to the next track.
import Audio from 'rackham/utils/html5-audio';

var whistlers = {},
    SOCKET_OPTIONS = {
      'force new connection': true
    };

var Whistler = Ember.Object.extend(Ember.Evented, {
  roomId: null,
  audio: null,

  init: function($audio) {
    this._super();

    var socket = io.connect(ENV.whistlePath, SOCKET_OPTIONS),
        $audio = this.get('$audio'),
        audio = Audio.create({ '$audio': $audio }),
        self = this;

    self.set('socket', socket);
    self.set('audio', audio);
    whistlers[self.get('roomId')] = self;
    socket.emit('join_room', self.get('roomId'));

    socket.on('new_track', function() {
      self.trigger('didReceiveTrack');
    });

    socket.once('room_current_time', function(currentTime) {
      audio.setCurrentTime(currentTime);
    });

    audio.one('loadedmetadata', function() {
      socket.emit('get_current_time');
      self.listenForProgress();
    });

    audio.on('ended', function() {
      socket.emit('done_track');
    });
  },

  uploadedTrack: function() {
    this.get('socket').emit('uploaded_track');
  }.on('didUploadTrack'),

  changeSong: function(url) {
    this.get('audio').changeSong(url);
  },

  listenForProgress: function() {
    var socket = this.get('socket'),
        audio = this.get('audio');

    setInterval(function() {
      if (audio.get('isEnded')) { return; }
      socket.emit('progress', audio.get('currentTime'));
    }, 2000);
  }
});

Whistler.reopenClass({
  find: function(roomId) { return whistlers[roomId]; }
});

export default Whistler;
