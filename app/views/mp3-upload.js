import App from 'rackham/app';
import Presto from 'presto';
import 'id3';

export default Ember.View.extend({
  templateName: 'mp3-upload',
  isDisabled: Ember.computed.alias('upload.isPending'),

  uploadTrack: function(evt) {
    var input = evt.target,
        file = (input.files && input.files[0]),
        self = this;

    var upload = Presto.upload(file);
    self.set('upload', upload);

    Ember.RSVP.hash({
      postResponse: upload,
      metadata: parseMetadata(file)

    }).then(function(results) {
      var $postResponse = $(results.postResponse),
          filepath = $postResponse.find('PostResponse > Location').text();

      self.createTrack(filepath, results.metadata);
      input.value = '';

    }).catch(function(error) {
      // Do something better;
      throw error;
    });

  }.on('change'),

  createTrack: function(filepath, metadata) {
    this.get('parentView.controller').send('createTrack', {
      url: filepath,
      title: metadata.title,
      artist: metadata.artist,
      album: metadata.album
    });
  }
});

var parseMetadata = function(file) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    id3(file, function(err, tags) {
      if (err) { reject(err); }
      else { resolve(tags); }
    });
  });
};
