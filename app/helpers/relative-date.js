import relativeDate from 'rackham/utils/relative-date';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  return relativeDate(value);
});
