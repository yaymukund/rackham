export default DS.Model.extend({
  room: DS.belongsTo('room', { inverse: 'tracks' }),
  title: DS.attr('string'),
  artist: DS.attr('string'),
  url: DS.attr('string'),
  coverImageUrl: DS.attr('string'),
  filetype: DS.attr('string'),
  trackOrder: DS.attr('number'),
  playedAt: DS.attr('date'),
  addedAt: DS.attr('date')
});
