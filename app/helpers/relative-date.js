import relativeDate from 'rackham/utils/relative-date';

export default Ember.Handlebars.registerBoundHelper('relative-date',
  function(value, options) {
    return relativeDate(value);
  }
);
