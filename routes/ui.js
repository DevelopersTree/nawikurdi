const express = require('express');
const slugify = require('slugify');

const router = express.Router();
const render = require('./../helpers/customRender');

const { getBaseNames, getBaseRecordCount, getSingleName } = require('./../queries');

function loadIndexData(req) {
  return Promise.all([
    getBaseNames(req.query.limit, req.query.offset, req),
    getBaseRecordCount(),
  ])
    .then((values) => {
      const [names, [records]] = values;
      return {
        names: names || [],
        records: records.recordCount || 0,
      };
    });
}
function loadSingleData(req) {
  return Promise.all([
    getSingleName(req.params.id),
  ])
    .then((values) => {
      const [name] = values;
      return name || undefined;
    });
}
function loadFavoritesData() {
  return Promise.all([
    getBaseRecordCount(),
  ])
    .then((values) => {
      const [[records]] = values;
      return {
        records: records.recordCount || 0,
      };
    });
}


/* GET HOME PAGE */
router.get('/', async (req, res) => {
  const indexData = await loadIndexData(req);
  render(req, res, {
    view: 'index',
    title: ' ناوی كوردی | په‌ره‌ی سه‌ره‌كی',
    ...indexData,
    slugify,
  });
});
router.get('/favorites', async (req, res) => {
  const favoritesData = await loadFavoritesData(req);

  render(req, res, {
    view: 'favorites',
    title: ' ناوی كوردی | هه‌ڵبژاردنه‌كانم',
    ...favoritesData,
    slugify,
  });
});
router.get('/about', async (req, res) => {
  render(req, res, {
    view: 'about',
    title: ' ناوی كوردی | ده‌رباره‌ی ئێمه‌',
    slugify,
  });
});
router.get('/submit-name', async (req, res) => {
  render(req, res, {
    view: 'submit-name',
    title: ' ناوی كوردی | ناوێكی نوێ بنێره‌',
    slugify,
  });
});
router.get('/:id', async (req, res) => {
  const nameData = await loadSingleData(req);
  if(!nameData){
    res.redirect('/')
  }else{
    render(req, res, {
      view: 'single',
      title: ` ناوی كوردی | ${nameData.name}`,
      slugify,
      ...nameData
    });
  }
});


module.exports = router;
