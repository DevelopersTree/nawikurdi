/* eslint-disable camelcase */
/* eslint-disable no-undef */
import superagent from 'superagent';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import $ from 'jquery';
import { Notyf } from 'notyf';
import { debounce } from './general';

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load();

// Create an instance of Notyf
const notyf = new Notyf();

// scroll logic
const mybutton = document.getElementById('to-top');
function scrollFunction() {
  try {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  } catch (e) {
    //   useless comment
  }
}
window.onscroll = function scrolling() { scrollFunction(); };

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// end of scroll logic

const params = {
  limit: 10,
  offset: 0,
};

function load(param) {
  return superagent
    .get('/api')
    .query(param)
    .then((data) => data.body.names).catch(() => []);
}

function vote(data, cb = () => {}) {
  return superagent
    .post('/api/vote')
    .send(data)
    .end((err, res) => {
      cb(err, res);
    });
}
function showLoader() {
  $('.names-container').append(`
          <a class="col col-3 col-md col-sm loader" >
              <h3 class="txt-center"><i class="fas fa-spinner fa-spin"></i></h3>
          </a> 
      `);
}
function showNotFound() {
  $('.names-container').prepend(`
          <div class="col col-md col-sm  notfound-container">
              <img src="/images/child.webp"/>
              <p>ببوره‌ هیچ ناوێك نه‌دۆزرایه‌وه‌ ده‌سته‌واژه‌یه‌كی جیاواز به‌كاربهێنه‌</p>
          </div>
      `);
}
function hideNotFound() {
  $('.notfound-container').remove();
}
function hideLoader() {
  $('.loader').remove();
}
function display(container, data, mode = 'append') {
  // mode will be one of overwrite, append, prepend
  let alterMethod = 'html';
  if (mode === 'append') {
    alterMethod = 'append';
  } else if (mode === 'prepend') {
    alterMethod = 'prepend';
  }

  let html = '';
  data.map((record) => {
    let gender = 'هاوبه‌ش';
    if (record.gender === 'M' || record.gender === 'm') gender = 'كور';
    else if (record.gender === 'F' || record.gender === 'F') gender = 'كچ';

    html += `
            <a  class="col col-3 col-md col-sm card-container">
                <div class="card">
                    <h3 class="card-title">${record.name} ( ${gender} ) </h3>
                    <p class="card-body">
                        ${record.desc}
                    ‌</p>
                    <div class="card-footer">
                        <div class="btn-group _3btn">
                            <button class="down-vote" data-id="${record.nameId}"><i class="fas fa-arrow-down"></i> ( ${record.negative_votes} )</button>
                            <button class="up-vote" data-id="${record.nameId}"><i class="fas fa-arrow-up"></i>   ( ${record.positive_votes} ) </button>
                            <button class="make-fav" data-id="${record.nameId}" ><i class="far fa-heart"></i>  </button>
                        </div>
                    </div>
                </div>
            </a>
        `;
    return null;
  });
  $(container)[alterMethod](html);
  if (data.length === 0) {
    showNotFound();
  } else {
    hideNotFound();
  }
  return html;
}

async function getUID() {
  const fp = await fpPromise;
  const result = await fp.get();
  //   console.log(result.visitorId);
  return result.visitorId;

//   const name = `${cname}=`;
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i += 1) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
}
function makeHeartsRed() {
  let favIds = localStorage.getItem('fav_ids');
  if (favIds) {
    favIds = favIds.split(',');
    favIds.forEach((id) => {
      $(`.make-fav[data-id=${id}]`).removeClass('make-fav').addClass('remove-fav').html('<i class="fas fa-heart txt-red"></i>');
    });
  }
}
module.exports = {
  init() {
    window.topFunction = topFunction;
    makeHeartsRed();
    $(window).scroll(() => {
      const triggerMargin = 100;
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - triggerMargin) {
        let page = $('body').data('page') || 1;
        const calculatedOffset = params.limit * page;
        params.offset = calculatedOffset;
        page += 1;
        $('body').data('page', page);
        showLoader();
        load(params).then((data) => {
          hideLoader();
          display('.names-container', data, 'append');
          makeHeartsRed();
        });
      }
    });
    $('.input-filter').keyup(debounce(function () {
      $('body').data('page', 1);
      params.offset = 0;
      const val = $(this).val();
      if (val.trim() !== '') params.q = val;
      else delete params.q;
      showLoader();
      load(params).then((data) => {
        hideLoader();
        display('.names-container', data, 'overwrite');
        makeHeartsRed();
      });
    }, 300));
    $('.gender-filter').click(function () {
      $('body').data('page', 1);
      params.offset = 0;
      const val = `${$(this).data('value')}`;
      if (val.trim() != '-1') params.gender = val;
      else delete params.gender;
      $('.gender-filter').removeClass('active');
      $(this).addClass('active');
      showLoader();
      load(params).then((data) => {
        hideLoader();
        display('.names-container', data, 'overwrite');
        makeHeartsRed();
      });
    });
    $('.popularity-filter').click(function () {
      $('body').data('page', 1);
      params.offset = 0;
      const val = `${$(this).data('value')}`;
      if (val.trim() != '-1') params.sort = val;
      else delete params.sort;
      $('.popularity-filter').removeClass('active');
      $(this).addClass('active');
      showLoader();
      load(params).then((data) => {
        hideLoader();
        display('.names-container', data, 'overwrite');
        makeHeartsRed();
      });
    });

    $(document).delegate('.up-vote', 'click', async function () {
      const btn = this;
      vote({
        name_id: $(this).data('id'),
        uid: await getUID(),
        impact: 'positive',
      },
      (err) => {
        if (err) {
          const { errors } = err.response.body;
          notyf.error(errors[0].msg);
        } else {
          $(btn).html('<i class="fas fa-check"></i> نێردرا');
        }
      });
    });
    $(document).delegate('.down-vote', 'click', async function () {
      const btn = this;
      vote({
        name_id: $(this).data('id'),
        uid: await getUID(),
        impact: 'negative',
      },
      (err) => {
        if (err) {
          const { errors } = err.response.body;
          notyf.error(errors[0].msg);
        } else {
          $(btn).html('<i class="fas fa-check"></i> نێردرا');
        }
      });
    });
    $(document).delegate('.make-fav', 'click', function () {
      let favs = localStorage.getItem('favs');
      const id = $(this).data('id');
      $(this).removeClass('make-fav').addClass('remove-fav').html('<i class="fas fa-heart txt-red"></i>');
      const html = `<a class="col col-3 col-md col-sm card-container">${$(this).parents('.card-container').html()}</a>`;
      let fav_ids = localStorage.getItem('fav_ids');
      if (fav_ids) {
        fav_ids = fav_ids.split(',');
        if (fav_ids.indexOf(id) <= -1) {
          fav_ids.push(id);
          localStorage.setItem('fav_ids', fav_ids.join(','));
        }
      } else {
        localStorage.setItem('fav_ids', [id].join(','));
      }
      if (favs) {
        favs = JSON.parse(favs);
        favs[id] = html;
        localStorage.setItem('favs', JSON.stringify(favs));
      } else {
        const newFavs = {};
        newFavs[id] = html;
        localStorage.setItem('favs', JSON.stringify(newFavs));
      }
    });
    $(document).delegate('.remove-fav', 'click', function () {
      let favs = localStorage.getItem('favs');
      let fav_ids = localStorage.getItem('fav_ids');
      const id = $(this).data('id');
      if (favs) {
        favs = JSON.parse(favs);
        delete favs[id];
        localStorage.setItem('favs', JSON.stringify(favs));
      }
      if (fav_ids) {
        fav_ids = fav_ids.split(',');
        const index = fav_ids.indexOf(`${id}`);
        if (index > -1) {
          fav_ids.splice(index, 1);
        }
        localStorage.setItem('fav_ids', fav_ids.join(','));
      }
      $(this).removeClass('remove-fav').addClass('make-fav').html('<i class="far fa-heart"></i>');
    });
  },
};
