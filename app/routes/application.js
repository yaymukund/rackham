import request from 'ic-ajax';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    var store = this.store,
        session = this.controllerFor('session'),
        json = $('meta[name="current-user"]').attr('content');

    if (json) {
      session.loadUser(JSON.parse(json));
    }
  },

  actions: {
    logout: function() {
      var self = this,
          session = self.controllerFor('session');

      if (!session.get('isAuthenticated')) {
        return;
      }

      request({
        type: 'DELETE',
        url: '/session'
      }).then(function(response) {
        session.set('user', null);
        self.transitionTo('index');
      });
    },

    displayError: function(errorMessage) {
      this.controllerFor('notifications').set('error', errorMessage);
    },

    toggleFeedback: function() {
      this.toggleProperty('controller.isGivingFeedback');
    },

    closeFeedback: function() {
      this.set('controller.isGivingFeedback', false);
    },

    submitFeedback: function() {
      var feedback = this.controllerFor('feedback'),
          feedbackText = feedback.get('feedbackText');

      request({
        type: 'POST',
        url: '/feedback',
        data: { feedback_text: feedbackText }
      }).then(function() {
        feedback.set('hasGivenFeedback', true);
      });
    }
  }
});
