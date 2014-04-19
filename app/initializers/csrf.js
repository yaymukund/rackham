export default {
  name: 'csrf',
  initialize: function() {
    var token = $('meta[name="csrf-token"]').attr('content');

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      if (!options.crossDomain && token) {
        jqXHR.setRequestHeader('X-CSRF-Token', token);
      }
    });
  }
};
