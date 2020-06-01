const express = require('express');
const slugify = require('slugify');
const router = express.Router();
const render = require('./../helpers/customRender')

const {getBaseNames, getBaseRecordCount} = require('./../queries');

async function loadMetaContent(id) {
    const fileName = id;
    const filePath = path.join(__dirname, '../','database', 'metaFiles', fileName);
    return readFileAsync(filePath, 'utf8');
}
function loadIndexData (req){
  return Promise.all([
    getBaseNames(req.query.limit, req.query.offset, req),
    getBaseRecordCount()
  ])
  .then((values)=>{
    const [names, [records]] = values;
    return {
      names: names || [],
      records: records.recordCount || 0,
    };
  })
}
function loadFavoritesData (req){
  return Promise.all([
    getBaseRecordCount()
  ])
  .then((values)=>{
    const [[records]] = values;
    return {
      records: records.recordCount || 0,
    };
  })
}

// function loadSingleServiceData (id){
//   const seoNames = ["it-solutions_seo.txt", "creative-service_seo.txt", "digital-marketing_seo.txt"];
//   return Promise.all([
//     readSingleService(id),
//     loadMetaContent(seoNames[id-1]),
//   ])
//   .then((values)=>{
//     const [ service, seo] = values;
//     return {
//       service: service,
//       seo: seo || {},
//     };
//   })
// }

/* GET HOME PAGE */
router.get('/', async function(req, res, next) {
  const indexData = await loadIndexData(req);
  render(req, res, {
    view: 'index',
    title: ' ناوی كوردی | په‌ره‌ی سه‌ره‌كی',
    ...indexData,
    slugify,
  });
});
router.get('/favorites', async function(req, res, next) {
  const favoritesData = await loadFavoritesData(req);

  render(req, res, {
    view: 'favorites',
    title: ' ناوی كوردی | هه‌ڵبژاردنه‌كانم',
    ...favoritesData,
    slugify,
  });
});
router.get('/about', async function(req, res, next) {
  render(req, res, {
    view: 'about',
    title: ' ناوی كوردی | ده‌رباره‌ی ئێمه‌',
    slugify,
  });
});
router.get('/submit-name', async function(req, res, next) {
  render(req, res, {
    view: 'submit-name',
    title: ' ناوی كوردی | ناوێكی نوێ بنێره‌',
    slugify,
  });
});

// router.get('/blog/:slug/:blog_id', postViewCountMiddleware, async function(req, res, next) {
//   const blog = await loadSingleBlogData(req);
//   if(!blog.blog) res.redirect('/blog');

//   render(req, res, {
//     view: 'blog',
//     title: `Lucid Source | ${blog.blog.name}`,
//     blog: blog.blog,
//     related: blog.related,
//     seo: blog.seo,
//     seoFromContent: true,
//     contentType: 'blog',
//     slugify,
//   });
// });


module.exports = router;
