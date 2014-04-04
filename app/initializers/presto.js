import Presto from 'presto';

$(function() {
  Presto.reopenClass({
    bucketUrl: ENV.bucketPath,
    policyUrl: ENV.policyPath
  });
});
