export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['elementId:id'],
  elementId: 'volume-control',
  isDragging: false,

  setDimensions: function() {
    var $control = this.$();
    this.set('$control', $control);
    this.set('width', $control.width());
  }.on('didInsertElement'),

  listenForDragStop: function() {
    var self = this;
    $(window).on('mouseup.volumedragstop', function() {
      self.set('isDragging', false);
    });
  }.on('didInsertElement'),

  volumeButtonPosition: function() {
    var position = this.getWithDefault('volume', 1) * 100;
    return 'margin-left: %@%;'.fmt(position);
  }.property('volume'),

  startDragging: function(event) {
    event.preventDefault();
    this.set('isDragging', true);
  }.on('mouseDown'),

  setVolume: function(event) {
    var $control = this.get('$control'),
        width = this.get('width'),
        offset = $control.offset(),
        percent = (event.clientX - offset.left - 16) / width;

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
