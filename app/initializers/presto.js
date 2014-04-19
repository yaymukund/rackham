import Presto from 'presto';

export default {
  name: 'presto',
  initialize: function() {
    Presto.reopenClass({
      bucketUrl: ENV.bucketPath,
      policyUrl: ENV.policyPath
    });
  }
};
