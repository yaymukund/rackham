export default DS.Model.extend({
  room: DS.belongsTo('room', { inverse: 'tracks' }),
  title: DS.attr('string'),
  url: DS.attr('string'),
  filetype: DS.attr('string'),
  trackOrder: DS.attr('number'),
  playedAt: DS.attr('date'),
  addedAt: DS.attr('date')
});
