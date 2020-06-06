const express = require('express');
const router = express.Router();
const paginateValidator = require('../middlewares/validators/common/paginate');
const searchQueryValidator = require('../middlewares/validators/common/searchQuery');
const { genderValidator, submitNameValidator, voteNameValidator } = require('../middlewares/validators/main');
const { getBaseNames, getBaseRecordCount, vote, newName } = require('../queries');

router.get('/greeting', (req, res) => {
  res.json({
    msg: 'welcome to nawikurdi api visitor 😊',
  });
});

router.get('/', paginateValidator, searchQueryValidator, genderValidator, (req, res) => {
  const query = getBaseNames(req.query.limit, req.query.offset, req);
  const countQuery = getBaseRecordCount();
  const searchQuery = req.query.q;
  if (searchQuery) {
    countQuery.whereRaw('name like ?', `%${searchQuery}%`);
  }
  if (req.query.gender) {
    countQuery.andWhere('gender', req.query.gender);
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
  newName(req.body).then(() => {
    res.status(200).json({
      status: 1,
    });
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/vote', voteNameValidator, (req, res) => {
  const {body} = req;
  vote(body).then(() => {
    res.status(200).json({
      status: 1,
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
