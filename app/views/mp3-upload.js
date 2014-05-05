import App from 'rackham/app';
import Presto from 'presto';

export default Ember.View.extend({
  templateName: 'mp3-upload',
  isDisabled: Ember.computed.alias('upload.isPending'),

  progressWidth: function() {
    return 'width: '+this.get('upload.progress')+'%;';
  }.property('upload.progress'),

  uploadTrack: function(evt) {
    var input = evt.target,
        file = (input.files && input.files[0]),
        controller = this.get('controller');

    var upload = Presto.upload(file);
    this.set('upload', upload);

    upload.then(function(results) {
      input.value = '';
      upload.destroy();
      controller.send('createTrack', results);

    }).catch(function() {
      controller.send('displayError', 'There was an error uploading the mp3.');
    });
  }.on('change'),

  actions: {
    openInput: function() {
      this.$('input[type="file"]').click();
    }
  }
});
