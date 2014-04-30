import Presto from 'presto';

export default {
  name: 'presto',
  initialize: function() {
    Presto.configure({
      bucketUrl: ENV.bucketPath,
      policyUrl: ENV.policyPath
    });
  }
};
