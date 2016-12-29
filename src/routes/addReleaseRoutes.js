var express = require('express');

var addReleaseRouter = express.Router();

var mongoDb =  require('mongodb').MongoClient;

var router = function(nav) {

  addReleaseRouter.route('/')
      .get(function(req,res){
        res.render('addReleaseView', {
            nav: nav
        });
      });

      addReleaseRouter.route('/addRelease')
              .post(function(req,res) {
                console.log(req.body);
                var url = 'mongodb://localhost:27017/testCaseManagement';
                mongoDb.connect(url, function(err, db) {
                    var collection = db.collection('release');
                    var release = {
                      releaseName: req.body.releaseName,
                      releaseVersion: req.body.releaseVersion
                    };
                    collection.insert(release, function(err, results) {
                        res.redirect('/AddRelease');
                    });
                });

              });
              /*addTestCaseRouter.route('/profile')
                  .get(function(req,res){
                    res.json(req.user);
                  });*/
return addReleaseRouter;
};


module.exports = router;
