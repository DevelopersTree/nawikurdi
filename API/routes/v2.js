const express = require('express');

const db = require('../config');

const router = express.Router();
const paginateValidator = require('../middlewares/validators/common/paginate');
const searchQueryValidator = require('../middlewares/validators/common/searchQuery');
const { genderValidator, submitNameValidator } = require('../middlewares/validators/main');

function getBaseNames(limit, offset) {
  return db('names')
    .select(
      'nameId', 'name', 'desc', 'gender',
    )
    .where('Deleted', 0)
    .andWhere('Activated', 1)
    .limit(limit)
    .offset(offset);
}

function getBaseRecordCount() {
  return db('names').count({
    recordCount: 'nameId',
  })
    .where('Deleted', 0)
    .andWhere('Activated', 1);
}

router.get('/greeting', (req, res) => {
  res.json({
    msg: 'welcome to nawikurdi api visitor 😊',
  });
});

router.get('/', paginateValidator, searchQueryValidator, genderValidator, (req, res) => {
  const query = getBaseNames(req.query.limit, req.query.offset);
  const countQuery = getBaseRecordCount();
  const searchQuery = req.query.q;
  if (searchQuery) {
    countQuery.whereRaw('name like ?', `%${searchQuery}%`);
    query.whereRaw('name like ?', `%${searchQuery}%`);
  }
  if (req.query.gender) {
    countQuery.andWhere('gender', req.query.gender);
    query.andWhere('gender', req.query.gender);
  }
  query.orderByRaw('CHAR_LENGTH(`desc`)DESC');

  query.then((names) => {
    countQuery.then(([records]) => {
      res.status(200).json({
        names,
        recordCount: records,
      });
    });
  });
});

router.get('/records', (req, res) => {
  getBaseRecordCount().then(([recordCount]) => {
    res.status(200).json(recordCount);
  });
});

router.post('/', submitNameValidator, (req, res) => {
  db('names').insert({
    name: req.body.name,
    desc: req.body.desc,
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
