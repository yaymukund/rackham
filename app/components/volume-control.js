export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['elementId:id'],
  elementId: 'volume-control',
  volume: 1,
  isDragging: false,

  setDimensions: function() {
    var $control = this.$();
    this.set('offset', $control.offset());
    this.set('width', $control.width());
  }.on('didInsertElement'),

  stopDragging: function() {
    this.set('isDragging', false);
  }.on('mouseLeave', 'mouseUp'),

  volumeWidth: function() {
    var volume = this.get('volume');
    return 'width: %@%;'.fmt(volume*100);
  }.property('volume'),

  startDragging: function(event) {
    this.set('isDragging', true);
  }.on('mouseDown'),

  setVolume: function(event) {
    var offset = this.get('offset'),
        width = this.get('width'),
        percent = (event.clientX - offset.left) / width;

    percent = Math.round(percent*100) / 100;
    this.set('volume', percent);
    return false;
  }.on('click'),

  setVolumeIfDragging: function(event) {
    if (this.get('isDragging')) {
      this.setVolume(event);
    }
  }.on('mouseMove')
});
