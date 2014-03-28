// A whistler instance is responsible for:
//
// - Broadly, all socket-based communication on the client.
// - Polling the sockets server with the currentTime (`emit('progress')`)
// - Reload the player when the track URL changes.
// - Fire a `new_track` event when the Whistle server says that everyone's
//   ready to move to the next track.
var Whistler = (function(io, $) {
  var SOCKET_OPTIONS = {'force new connection': true},
      WHISTLER_URL = null,
      socket = null,
      $audio = null,
      exports = {};

  exports.bindTo = function(roomId, $_audio) {
    if (!WHISTLER_URL) {
      WHISTLER_URL = $('meta[name=whistle-path]').attr('content');
    }

    $audio = $_audio;
    socket = io.connect(WHISTLER_URL, SOCKET_OPTIONS);

    socket.emit('join_room', roomId);

    socket.once('room_current_time', function(currentTime) {
      console.log('whistler: room_current_time with currentTime', currentTime);
      $audio[0].currentTime = currentTime;
    });

    $audio.one('loadedmetadata', function() {
      console.log('whistler: loadedmetadata');
      socket.emit('get_current_time');
    });

    $audio.one('loadedmetadata', function() {
      boundIntervalId = _listenForProgress($audio, socket);
    });

    $audio.on('ended', function() {
      console.log('whistler: ended');
      socket.emit('done_track');
    });
  };

  exports.changeSong = function(url) { _changeSong($audio, url); };
  exports.on = function(event, fn) { socket.on(event, fn); };
  exports.emit = function(event, content) {
    socket.emit(event, content);
  };

  var _changeSong = function($audio, url) {
    var $source = $audio.children('source');

    console.log(url);
    if (!url || ($source.attr('src') === url)) {
      return;
    }

    $source.attr('src', url);
    $audio[0].pause();
    $audio[0].load();
  };

  var _listenForProgress = function($audio, socket, ms) {
    setInterval(function() {
      if ($audio[0].paused) { return; }
      socket.emit('progress', $audio[0].currentTime);
    }, ms || 2000);
  };

  return exports;
})(io, jQuery);
