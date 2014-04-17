export default Ember.Handlebars.makeBoundHelper(function(seconds, options) {
  var minutes;

  seconds = parseInt(seconds, 10);
  minutes = Math.floor(seconds / 60, 10);

  seconds = seconds % 60;

  if (seconds < 10) {
    seconds = "0"+seconds;
  }

  var time = minutes+':'+seconds;
  return new Ember.Handlebars.SafeString('<time>'+time+'</time>');
});
