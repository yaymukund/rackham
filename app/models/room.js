export default DS.Model.extend({
  title: DS.attr('string'),
  restricted: DS.attr('boolean'),
  tracks: DS.hasMany('track', { inverse: 'room' })
});
