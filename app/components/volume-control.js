export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['elementId:id'],
  elementId: 'volume-control',
  volume: 1,
  isDragging: false,

  setDimensions: function() {
    this.set('$control', this.$());
  }.on('didInsertElement'),

  listenForDragStop: function() {
    var self = this;
    $(window).on('mouseup.volumedragstop', function() {
      self.set('isDragging', false);
    });
  }.on('didInsertElement'),

  volumeWidth: function() {
    var volume = this.get('volume');
    return 'left: %@%;'.fmt(volume*100);
  }.property('volume'),

  startDragging: function(event) {
    event.preventDefault();
    this.set('isDragging', true);
  }.on('mouseDown'),

  setVolume: function(event) {
    var $control = this.get('$control'),
        offset = $control.offset(),
        width = $control.width(),
        percent = (event.clientX - offset.left - 6) / width;

    percent = Math.round(percent*100) / 100;
    if (percent > 1) { percent = 1; }
    if (percent < 0) { percent = 0; }
    this.set('volume', percent);
    return false;
  }.on('click'),

  setVolumeIfDragging: function(event) {
    if (this.get('isDragging')) {
      this.setVolume(event);
    }
  }.on('mouseMove'),

  stopListenForDragStop: function() {
    $(window).off('mouseup.volumedragstop');
  }.on('willDestroyElement')
});
