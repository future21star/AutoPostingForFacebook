require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'DaPeoDGvY2AAAAAAAABXU1-91y5iCVQyduRNf340Nd-RqxNoC7Gt-I0V1zjLzpJ4' });
// dbx.filesListFolder({path: ''})
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

var graph = require('fbgraph');
var conf = {
  // client_id: '174457976455341',
  // client_secret: '628c9cb6724decae7c04deaf5e1343f5',
  client_id: '214522682642095',
  client_secret: 'f99d94a419b063e50674e3dd38c23931',
  access_token: 'EAACeqym3AK0BAKaL8zZBnrbCQWVMFsGmDlCCAvZAxfmsFohWkmiXiXQnZA7Vs9kKJSNMdeu62NOVsQNQKWKyMiQUJi75ibEIswWLPqTuqVULE7iWukZAD57XcDcHHvkBN0mO9Lc1a9J8gzO2aZBSWWwHzOjsx05TcVfs3U5cp9UrN4zXQWVGbRbd9ScULuZCrq0DFQlZAzfowZDZD',
  user_id: '209454969647232',
  extended_access_token: 'EAACeqym3AK0BAKaL8zZBnrbCQWVMFsGmDlCCAvZAxfmsFohWkmiXiXQnZA7Vs9kKJSNMdeu62NOVsQNQKWKyMiQUJi75ibEIswWLPqTuqVULE7iWukZAD57XcDcHHvkBN0mO9Lc1a9J8gzO2aZBSWWwHzOjsx05TcVfs3U5cp9UrN4zXQWVGbRbd9ScULuZCrq0DFQlZAzfowZDZD',
  test_page_id: '134713127328575',
  test_page_access_token: 'EAACeqym3AK0BALYMN9W09AZAjKOofrsEf1GOxx0OUHE4fLLqZA5sv6p8mFi4R106S9q6qBLd6KjD1d0SF8ZCFEkiZC55Qfz2vVDjIoZBDZBZBfrtovvefEeYstma3pUdBiNl9eryMHM1OIVFnZCXL34gZB5pMNudyTmkIlxdGaCzsXgZDZD'
}
graph.extendAccessToken({
  "access_token":    conf.test_page_access_token,
  "client_id":      conf.client_id,
  "client_secret":  conf.client_secret
}, function (err, facebookRes) {
  conf.extended_access_token = facebookRes.access_token;
  graph.get("me?access_token=" + conf.extended_access_token, function(err, res) {
    console.log(res);  
  });
});
// dbx.filesDownload({path: '/img_0131.jpg'})
// .then(function(response) {
//   console.log(response);
// })
// .catch(function(err) {
//   console.log(err);
// })
