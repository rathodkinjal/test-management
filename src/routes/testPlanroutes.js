var express = require('express');

var testplanRouter = express.Router();

var mongoDb =  require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function(nav) {

  testplanRouter.route('/')
            .get(function (req, res) {
              var url = 'mongodb://localhost:27017/testCaseManagement';
              mongoDb.connect(url, function(err, db) {
                  var collection = db.collection('testCase');
                  collection.find({}).toArray(
                    function(err, results){
                      res.render('testPlanView', {
                        nav: nav,
                        testcases: results
                    });
                    });
              });

            });

  /*bookRouter.route('/:id')
          .get(function (req, res) {
              var id = new objectId(req.params.id);
              var url = 'mongodb://localhost:27017/libraryApp';
              mongoDb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({ _id: id },
                  function(err, results) {
                    res.render('bookView', {
                      title: 'Books',
                      nav: nav,
                      book: results
                    });
                  });
                });

              });*/
 testplanRouter.route('/UpdateTestCase/updateTest')
              .post(function(req,res) {
                console.log(req.body);
                var url = 'mongodb://localhost:27017/testCaseManagement';
                mongoDb.connect(url, function(err, db) {
                    var collection = db.collection('testPlan1');
                    var testPlan = {
                      Comments: req.body.comments,
                      ActualResult: req.body.actualResult,
                    };
                    collection.update(testCase, function(err, results) {
                        res.redirect('/UpdateTestCase');
                    });
                });

              });
              return testplanRouter;
}

module.exports = router;
