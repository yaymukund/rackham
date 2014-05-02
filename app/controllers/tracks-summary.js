import TracksController from 'rackham/controllers/tracks';

export default TracksController.extend({
  backgroundImageStyle: function() {
    var url = this.get('currentTrack.coverImageUrl');
    return 'background-image: url(%@);'.fmt(url);
  }.property('currentTrack.coverImageUrl')
});
