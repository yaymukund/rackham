var SOCKET_OPTIONS = { 'force new connection': true };

export default Ember.Mixin.create({
  socket: null,

  connect: function(path) {
    var self = this,
        socket = io.connect(path, SOCKET_OPTIONS);

    self.get('socketEvents').forEach(function(eventName) {
      socket.on(eventName, function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(eventName);
        self.trigger.apply(self, args);
      });
    });

    this.set('socket', socket);
  },

  emit: function() {
    var socket = this.get('socket');
    socket.emit.apply(socket, arguments);
  }
});
