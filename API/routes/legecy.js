const express = require('express');

const router = express.Router();
const db = require('../config');

router.get('/', (req, res) => {
  res.json({
    msg: 'welcome to nawikurdi api',
  });
});
router.get('/:limit/:offset', (req, res) => {
  db('names').select().where({
    Deleted: 0,
    Activated: 1,
  }).limit(parseInt(req.params.limit, 10))
    .offset(parseInt(req.params.offset, 10))
    .then((names) => {
      res.status(200).json(names);
    });
});

router.get('/numberOffRecord', (req, res) => {
  db('names').count({
    numberOffRecord: 'nameId',
  }).where({
    Deleted: 0,
    Activated: 1,
  }).then(([numberOffRecord]) => {
    res.status(200).json(numberOffRecord);
  });
});

router.get('/:limit/:offset/:searchValue/:dropdwon', (req, res) => {
  let searchValueEdit = req.params.searchValue;
  if (searchValueEdit === 'noSearchValue') {
    searchValueEdit = '';
  }
  if (req.params.dropdwon === 'F' || req.params.dropdwon === 'M' || req.params.dropdwon === 'O') {
    db('names').select().where({
      Deleted: 0,
      Activated: 1,
      gender: req.params.dropdwon,
    }).whereRaw('name like ?', `%${searchValueEdit}%`)
      .limit(parseInt(req.params.limit, 10))
      .offset(parseInt(req.params.offset, 10))
      .then((names) => {
        db('names').count({
          numberOffRecord: 'nameId',
        }).where({
          Deleted: 0,
          Activated: 1,
          gender: req.params.dropdwon,
        }).whereRaw('name like ?', `%${searchValueEdit}%`)
          .then((numberOffRecord) => {
            res.status(200).json({
              names,
              numberOffRecord: numberOffRecord[0],
            });
          });
      });
  } else {
    db('names').select().where({
      Deleted: 0,
      Activated: 1,
    }).whereRaw('name like ?', `%${searchValueEdit}%`)
      .limit(parseInt(req.params.limit, 10))
      .offset(parseInt(req.params.offset, 10))
      .then((names) => {
        db('names').count({
          numberOffRecord: 'nameId',
        }).where({
          Deleted: 0,
          Activated: 1,
        }).whereRaw('name like ?', `%${searchValueEdit}%`)
          .limit(parseInt(req.params.limit, 10))
          .offset(parseInt(req.params.offset, 10))
          .then((numberOffRecord) => {
            res.status(200).json({
              names,
              numberOffRecord: numberOffRecord[0],
            });
          });
      });
  }
});

router.post('/addNewName', (req, res) => {
  db('names').insert({
    name: req.body.sendName,
    desc: req.body.meaningSendName,
    gender: req.body.gender,
  }).then(() => {
    res.status(200).json({
      status: 1,
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
