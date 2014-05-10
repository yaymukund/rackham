export default DS.Model.extend({
  tracks: DS.hasMany('track', { inverse: 'user', async: true }),
  login: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string')
});
