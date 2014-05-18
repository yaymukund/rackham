// A whistler instance is responsible for:
//
// - Broadly, all socket-based communication on the client.
// - Polling the sockets server with the currentTime (`emit('progress')`)
// - Reload the player when the track URL changes.
// - Fire a `new_track` event when the Whistle server says that everyone's
//   ready to move to the next track.
import Html5Audio from 'rackham/utils/html5-audio';
import SocketMixin from 'rackham/mixins/socket';

var whistlers = {};

var Whistler = Html5Audio.extend(SocketMixin, {
  roomId: null,
  socketEvents: [
    'room_current_time',
    'new_track'
  ],

  init: function() {
    this._super();
    this.connect(ENV.whistlePath);
    var roomId = this.get('roomId');
    this.emit('join_room', roomId);
    whistlers[roomId] = this;
  },

  setInitialTime: function(time) {
    this.updateTime(time);
    this.off('room_current_time', null, 'setInitialTime');
  }.on('room_current_time'),

  leaveRoom: function() {
    var roomId = this.get('roomId');
    this.emit('leave_room');
  }.on('didLeaveRoom'),

  emitGetCurrentTime: function() {
    this.emit('get_current_time');
  }.on('loadedmetadata'),

  emitDoneTrack: function() {
    this.emit('done_track');
  }.on('ended'),

  emitUploadedTrack: function() {
    this.emit('uploaded_track');
  }.on('didUploadTrack'),

  emitProgress: function() {
    var self = this;

    var intervalId = setInterval(function() {
      if (self.get('isEnded')) { return; }
      self.emit('progress', self.get('currentTime'));
    }, 500);

    this.set('intervalId', intervalId);

    // Only run once...
    this.off('loadedmetadata', null, 'emitProgress');
  }.on('loadedmetadata'),

  willDestroy: function() {
    var intervalId = this.get('intervalId');

    if (intervalId) {
      clearInterval(intervalId);
    }

    delete whistlers[this.get('roomId')];
  }
});

Whistler.reopenClass({
  find: function(roomId) { return whistlers[roomId]; }
});

export default Whistler;
