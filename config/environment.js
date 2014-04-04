module.exports = function(environment) {
  var ENV = {
    rootURL: '/',
    bucketPath: 'https://presto-server.s3.amazonaws.com',
    policyPath: '/presto/s3_token',
    FEATURES: {
      // Here you can enable experimental featuers on an ember canary build
      // e.g. 'with-controller': true
    }
  };

  if (environment === 'development') {
    ENV.whistlePath = 'http://localhost:3001';
  }

  if (environment === 'production') {
    ENV.whistlePath = 'http://whistle-server.herokuapp.com';
  }

  return JSON.stringify(ENV); // Set in index.html
};
