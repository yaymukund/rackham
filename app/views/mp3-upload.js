import App from 'rackham/app';
import Presto from 'presto';
import 'id3';

export default Ember.View.extend({
  templateName: 'mp3-upload',
  isDisabled: Ember.computed.alias('upload.isPending'),

  progressWidth: function() {
    return 'width: '+this.get('upload.progress')+'%;';
  }.property('upload.progress'),

  uploadTrack: function(evt) {
    var input = evt.target,
        file = (input.files && input.files[0]),
        self = this;

    var upload = Presto.upload(file);
    self.set('upload', upload);

    upload.then(function(results) {
      input.value = '';
      self.get('controller').send('createTrack', results);

    }).catch(function(error) {
      // Do something better;
      throw error;
    });
  }.on('change'),

  actions: {
    openInput: function() {
      this.$('input[type="file"]').click();
    }
  }
});
