var express = require('express');
var router = express.Router();
var db = require('../config');

router.get('/:limit/:offset', function (req, res, next) {
  db('names').select().where({
    Deleted: 0,
    Activated: 1
  }).limit(parseInt(req.params.limit)).offset(parseInt(req.params.offset)).then(function (names) {
    res.status(200).json(names);
  });
});

router.get('/numberOffRecord', function (req, res, next) {
  db('names').count({
    numberOffRecord: 'nameId'
  }).where({
    Deleted: 0,
    Activated: 1
  }).then(function ([numberOffRecord]) {
    res.status(200).json(numberOffRecord);
  });
});

router.get('/:limit/:offset/:searchValue/:dropdwon', function (req, res, next) {
  searchValueEdit = req.params.searchValue;
  if (searchValueEdit == 'noSearchValue') {
    searchValueEdit = '';
  }
  if (req.params.dropdwon == 'F' || req.params.dropdwon == 'M' || req.params.dropdwon == 'O') {
    db('names').select().where({
      Deleted: 0,
      Activated: 1,
      gender: req.params.dropdwon
    }).whereRaw("name like ?", "%" + searchValueEdit + "%").limit(parseInt(req.params.limit)).offset(parseInt(req.params.offset)).then(function (names) {
      db('names').count({
        numberOffRecord: 'nameId'
      }).where({
        Deleted: 0,
        Activated: 1,
        gender: req.params.dropdwon
      }).whereRaw("name like ?", "%" + searchValueEdit + "%").then(function (numberOffRecord) {
        res.status(200).json({
          names: names,
          numberOffRecord: numberOffRecord[0]
        });
      });
    });
  } else {
    db('names').select().where({
      Deleted: 0,
      Activated: 1
    }).whereRaw("name like ?", "%" + searchValueEdit + "%").limit(parseInt(req.params.limit)).offset(parseInt(req.params.offset)).then(function (names) {
      db('names').count({
        numberOffRecord: 'nameId'
      }).where({
        Deleted: 0,
        Activated: 1
      }).whereRaw("name like ?", "%" + searchValueEdit + "%").limit(parseInt(req.params.limit)).offset(parseInt(req.params.offset)).then(function (numberOffRecord) {
        res.status(200).json({
          names: names,
          numberOffRecord: numberOffRecord[0]
        });
      });
    });
  }
});

router.post('/addNewName', function (req, res, next) {
  db("names").insert({
    name: req.body.sendName,
    desc: req.body.meaningSendName,
    gender: req.body.gender
  }).then(function () {
    res.status(200).json({
      status: 1
    })
  }).catch(function (err) {
    res.json(err)
  });

});

module.exports = router;