var express = require('express');

var addTestPlanRouter = express.Router();

var mongoDb =  require('mongodb').MongoClient;

var router = function(nav) {

  addTestPlanRouter.route('/')
            .get(function (req, res) {
              var url = 'mongodb://localhost:27017/testCaseManagement';
              mongoDb.connect(url, function(err, db) {
                  var collection = db.collection('release');
                  collection.find({}).toArray(
                    function(err, results){
                      res.render('addTestPlanView', {
                        nav: nav,
                        releases: results
                    });
                    });
              });

            });

      addTestPlanRouter.route('/addTestPlan')
              .post(function(req,res) {
                console.log(req.body);
                var url = 'mongodb://localhost:27017/testCaseManagement';
                mongoDb.connect(url, function(err, db) {
                    var collection = db.collection('testPlan1');
                    var testPlan = {
                      testPlanName: req.body.testPlanName,
                      releaseName: req.body.releaseName
                    };
                    collection.insert(testPlan, function(err, results) {
                        res.redirect('/AddTestPlan');
                    });
                });

              });

              /*addTestCaseRouter.route('/profile')
                  .get(function(req,res){
                    res.json(req.user);
                  });*/

return addTestPlanRouter;

};


module.exports = router;
