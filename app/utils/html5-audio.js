var EVENT_NAMES = ['loadedmetadata', 'ended', 'timeupdate', 'playing'];

export default Ember.Object.extend(Ember.Evented, {
  '$audio': null,
  isPlaying: false,
  isEnded: false,
  hasMetadata: false,
  currentTime: 0,

  init: function() {
    this._super();
    var $audio = this.get('$audio'),
        self = this;

    $.each(EVENT_NAMES, function(i, eventName) {
      $audio.bind(eventName, function() {
        self.trigger(eventName, $audio);
      });
    });
  },

  setLoadedMetadata: function($audio) {
    this.set('hasMetadata', true);
  }.on('loadedmetadata'),

  didEnd: function($audio) {
    this.set('isPlaying', false);
    this.set('isEnded', true);
  }.on('ended'),

  didPlay: function($audio) {
    this.set('isPlaying', true);
    this.set('isEnded', false);
  }.on('playing'),

  didTimeUpdate: function($audio) {
    this.set('currentTime', $audio[0].currentTime);
  }.on('timeupdate'),

  changeSong: function(url) {
    var $audio = this.get('$audio'),
        $source = $audio.children('source');

    if (!url || ($source.attr('src') === url)) {
      return;
    }

    this.set('hasMetadata', false);
    this.set('isPlaying', false);
    this.set('isEnded', true);
    this.set('currentTime', 0);

    $source.attr('src', url);
    $audio[0].pause();
    $audio[0].load();
  },

  setCurrentTime: function(currentTime) {
    this.get('$audio')[0].currentTime = currentTime;
  }
});
