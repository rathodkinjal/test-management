var express = require('express');

var adminRouter = express.Router();

var mongoDb =  require('mongodb').MongoClient;
var tests = [
  {
    testCase : 'New Test Case',
    testCaseData: 'Test Data',
    expectedResult: 'Something expected',
    Comments: '',
    ActualResult: 'Pass'
  },
  {
    testCase : 'New Test Case',
    testCaseData: 'Test Data',
    expectedResult: 'Something expected',
    Comments: '',
    ActualResult: 'Pass'
  }
];

var router = function(nav) {

  adminRouter.route('/addTests')
    .get(function(req, res){
      var url = 'mongodb://localhost:27017/testCaseManagement';
      mongoDb.connect(url, function(err, db) {
      var collection = db.collection('testCase');
      collection.insertMany(tests, function(err, results){
        res.send(results);
        db.close();
      });

      //res.send('Inserting books');
    });
  });
  return adminRouter;
};

module.exports = router;
