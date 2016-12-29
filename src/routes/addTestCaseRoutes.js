var express = require('express');

var addTestCaseRouter = express.Router();

var mongoDb =  require('mongodb').MongoClient;

var router = function(nav) {

  addTestCaseRouter.route('/')
            .get(function (req, res) {
              var url = 'mongodb://localhost:27017/testCaseManagement';
              mongoDb.connect(url, function(err, db) {
                  var collection = db.collection('testplan1');
                  collection.find({}).toArray(
                    function(err, results){
                      res.render('addTestCaseView', {
                        nav: nav,
                        testplans: results
                    });
                  });
              });
            });


      addTestCaseRouter.route('/addTest')
              .post(function(req,res) {
                console.log(req.body);
                var url = 'mongodb://localhost:27017/testCaseManagement';
                mongoDb.connect(url, function(err, db) {
                    var collection = db.collection('testCase');
                    collection.find({"testPlanName": req.body.testplanName}).toArray(
                    function(err, results){
                        testPlan: results
                    });
                    var testCase = {
                      testCase: req.body.testCase,
                      testCaseData: req.body.testData,
                      expectedResult: req.body.expectedResult,
                      Comments: '',
                      ActualResult: 'Not Executed',
                      testPlanId: testPlan._id
                    };
                    collection.insert(testCase, function(err, results) {
                        res.redirect('/AddTestCase');
                    });
                });

              });
              /*addTestCaseRouter.route('/profile')
                  .get(function(req,res){
                    res.json(req.user);
                  });*/
return addTestCaseRouter;
};


module.exports = router;
