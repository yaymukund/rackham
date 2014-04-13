export default Ember.Handlebars.registerBoundHelper('audio-timestamp',
  function(seconds) {
    var minutes;

    seconds = parseInt(seconds, 10);
    minutes = Math.floor(seconds / 60, 10);

    seconds = seconds % 60;

    if (seconds < 10) {
      seconds = "0"+seconds;
    }

    return minutes+':'+seconds;
  }
);
