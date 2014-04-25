export default Ember.Controller.extend({
  needs: ['session'],
  session: Ember.computed.alias('controllers.session')
});
