var EVENT_NAMES = ['loadedmetadata', 'ended', 'timeupdate', 'playing'];

export default Ember.Object.extend(Ember.Evented, {
  '$audio': null,
  isPlaying: false,
  isEnded: false,
  hasMetadata: false,
  currentTime: null,
  duration: null,
  hasDuration: Ember.computed.notEmpty('duration'),
  hasCurrentTime: Ember.computed.notEmpty('currentTime'),
  hasTime: Ember.computed.and('hasCurrentTime', 'hasDuration'),

  init: function() {
    this._super();

    var $audio = this.get('$audio'),
        self = this;

    EVENT_NAMES.forEach(function(eventName) {
      $audio.bind(eventName, function() {
        self.trigger(eventName, $audio);
      });
    });
  },

  setLoadedMetadata: function($audio) {
    this.set('duration', $audio[0].duration);
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

  setCurrentTime: function($audio) {
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
    this.set('currentTime', null);
    this.set('duration', null);

    $source.attr('src', url);
    $audio[0].pause();
    $audio[0].load();
  },

  updateTime: function(currentTime) {
    this.get('$audio')[0].currentTime = currentTime;
  },

  updateVolume: function() {
    var volume = this.get('volume'),
        audio = this.get('$audio')[0];

    Ember.run.once(function() { audio.volume = volume; });
  }.observes('volume')
});
