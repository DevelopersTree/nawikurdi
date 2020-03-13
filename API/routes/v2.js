const express = require('express');
const db = require('../config');

const router = express.Router();
const paginateValidator = require('../middlewares/validators/common/paginate');
const searchQueryValidator = require('../middlewares/validators/common/searchQuery');
const { genderValidator, submitNameValidator, voteNameValidator } = require('../middlewares/validators/main');

function getBaseNames(limit, offset) {
  return db('names')
    .select(
      'nameId', 'name', 'desc', 'gender',
      'positive_votes', 'negative_votes'
    )
    .where('deleted', 0)
    .andWhere('activated', 1)
    .limit(limit)
    .offset(offset);
}

function getBaseRecordCount() {
  return db('names').count({
    recordCount: 'nameId',
  })
    .where('deleted', 0)
    .andWhere('activated', 1);
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
  if (req.query.sort && ['positive', 'negative', 'positive'].indexOf(req.query.sort) > -1) {
    const sort = req.query.sort;
    if(sort === 'positive') {
      query.orderBy('positive_votes', 'desc');
    }
    else if(sort === 'negative') {
      query.orderBy('negative_votes', 'desc');
    }
  }else {
    query.orderByRaw('CHAR_LENGTH(`desc`)DESC');
  }

  query.then((names) => {
    countQuery.then(([records]) => {
      res.status(200).json({
        names,
        recordCount: records.recordCount,
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

router.post('/vote', voteNameValidator, (req, res) => {
  const {body} = req;
  let impactSection = 'positive_votes = positive_votes+1';
  if(body.impact === 'negative') impactSection = 'negative_votes = negative_votes+1'
  return Promise.all([
    db.raw(`UPDATE names SET ${impactSection} WHERE nameid=?`, [body.name_id]),
    db('votes').insert({
      nameid: body.name_id,
      uid: body.uid,
      impact: body.impact,
    })
  ]).then(() => {
    res.status(200).json({
      status: 1,
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
