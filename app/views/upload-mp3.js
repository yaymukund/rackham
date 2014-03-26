export default Ember.TextField.extend({
  type: 'file',
  attributeBinding: ['name'],
  action: 'createTrack',
  upload: function(evt) {
    var input = evt.target,
        file = (input.files && input.files[0]),
        self = this;

    this.set('disabled', true);

    Ember.RSVP.hash({
      postResponse: MusicRoom.presto.uploadFile(file),
      metadata: parseMetadata(file)

    }).then(function(results) {
      var $postResponse = $(results.postResponse),
          filepath = $postResponse.find('PostResponse > Location').text(),
          attributes = {
            url: filepath,
            title: results.metadata.title,
            artist: results.metadata.artist,
            album: results.metadata.album
          };

      self.get('parentView.controller').send('createTrack', attributes);
      input.value = '';
      self.set('disabled', false);
    });

  }.on('change')
});

var parseMetadata = function(file) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    id3(file, function(err, tags) {
      if (err) { reject(err); }
      else { resolve(tags); }
    });
  });
};
