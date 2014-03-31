import Presto from 'presto';

$(function() {
  Presto.reopenClass({
    bucketUrl: $('meta[name=bucket-path]').attr('content'),
    policyUrl: $('meta[name=policy-path]').attr('content')
  });
});
