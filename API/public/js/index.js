import {debounce} from './general';
import superagent from 'superagent';
import $ from 'jquery';
import { Notyf } from 'notyf';
// Create an instance of Notyf
const notyf = new Notyf();

// scroll logic
let mybutton = document.getElementById("to-top");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// end of scroll logic

const params = {
    limit: 10,
    offset: 0,
};

function load(params){
    return superagent
        .get(`/api`)
        .query(params)
        .then((data)=>{
            return data.body.names;
        }).catch((err)=>{
            return [];
        });
}

function vote(data, cb = ()=>{}){
    return superagent
        .post(`/api/vote`)
        .send(data)
        .end((err, res)=>{
            cb(err, res)
        });
}
function display(container, data, mode = 'append'){
    // mode will be one of overwrite, append, prepend
    let alterMethod = 'html';
    if(mode === 'append'){
        alterMethod = 'append';
    } else if(mode == 'prepend') {
        alterMethod = 'prepend';
    }
    
    let html = ``;
    data.map((record) =>{
        let gender = 'هاوبه‌ش'; 
        if(record.gender == 'M' || record.gender == 'm') gender ='كور';
        else if(record.gender == 'F' || record.gender == 'F') gender ='كچ';

        html += `
            <a  class="col col-3 col-md col-sm card-container">
                <div class="card">
                    <h3 class="card-title">${record.name} ( ${gender} ) </h3>
                    <p class="card-body">
                        ${record.desc}
                    ‌</p>
                    <div class="card-footer">
                        <div class="btn-group _3btn">
                            <button class="down-vote" data-id="${record.nameId}"><i class="far fa-thumbs-down"></i> ( ${record.negative_votes} )</button>
                            <button class="up-vote" data-id="${record.nameId}"><i class="far fa-thumbs-up"></i>   ( ${record.positive_votes} ) </button>
                            <button><i class="far fa-heart"></i>  </button>
                        </div>
                    </div>
                </div>
            </a>
        `;
        return null;
    });
    $(container)[alterMethod](html);
    return html;
}
function showLoader(){
    $('.names-container').append(`
        <a class="col col-3 col-md col-sm loader" >
            <h3 class="txt-center"><i class="fas fa-spinner fa-spin"></i></h3>
        </a> 
    `);
}
function hideLoader(){
    $('.loader').remove()
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
module.exports = {
    init: function() {
        window.topFunction = topFunction;

        $(window).scroll(function(){
            const triggerMargin = 100;
            if ($(window).scrollTop() >= $(document).height()-$(window).height() - triggerMargin ){
                let page = $('body').data('page') || 1;
                const calculatedOffset = params.limit*page;
                params.offset = calculatedOffset;
                $('body').data('page', ++page);
                showLoader();
                load(params).then((data)=>{
                    hideLoader();
                    display('.names-container', data, 'append');
                });
            }
        });
        $('.input-filter').keyup(debounce(function(){
            $('body').data('page', 1);
            params.offset = 0;
            const val = $(this).val();
            if(val.trim()!= '') params.q = val;
            else delete params.q;
            showLoader()
            load(params).then((data)=>{
                hideLoader();
                display('.names-container', data, 'overwrite');
            });
            
        }, 300));
        $('.gender-filter').click(function(){
            $('body').data('page', 1);
            params.offset = 0;
            const val = `${$(this).data('value')}`;
            if(val.trim()!= '-1') params.gender = val;
            else delete params.gender;
            $(".gender-filter").removeClass("active");
            $(this).addClass("active");
            showLoader();
            load(params).then((data)=>{
                hideLoader();
                display('.names-container', data, 'overwrite');
            });
            
        });
        $('.popularity-filter').click(function(){
            $('body').data('page', 1);
            params.offset = 0;
            const val = `${$(this).data('value')}`;
            if(val.trim()!= '-1') params.sort = val;
            else delete params.sort;
            $(".popularity-filter").removeClass("active");
            $(this).addClass("active");
            showLoader();
            load(params).then((data)=>{
                hideLoader();
                display('.names-container', data, 'overwrite');
            });
            
        });
        $('.btn-showmore').click(function(){
            let page = $(this).data('page') || 1;
            const calculatedOffset = params.limit*page;
            params.offset = calculatedOffset;
            $(this).data('page', ++page);
            load(params).then((data)=>{
                
                display('.names-container', data, 'append');
            });
        });

        $(document).delegate('.up-vote', 'click', function(){
            const btn = this;
            vote({
                name_id: $(this).data('id'),
                uid: getCookie('uid'),
                impact: 'positive'
            },
            (err, res)=>{
                if(err){
                    const errors = err.response.body.errors;
                    notyf.error(errors[0].msg);
                } else {
                    $(btn).html(`<i class="fas fa-check"></i> نێردرا`)
                }
            })
        });
        $(document).delegate('.down-vote', 'click', function(){
            const btn = this;
            vote({
                name_id: $(this).data('id'),
                uid: getCookie('uid'),
                impact: 'negative'
            },
            (err, res)=>{
                if(err){
                    const errors = err.response.body.errors;
                    notyf.error(errors[0].msg);
                } else {
                    $(btn).html(`<i class="fas fa-check"></i> نێردرا`)
                }
            })
        });
        $(document).delegate('.make-fav', 'click', function(){
            let favs = localStorage.getItem('favs');
            const id = $(this).data('id');
            const html  = `<div class="col col-3 col-md col-sm card-container">${$(this).parents('.card-container').html()}</div>` ;
            if(favs){
                favs = JSON.parse(favs);
                favs[id] = html;
                localStorage.setItem('favs', JSON.stringify(favs))
            } else {
                const newFavs = {};
                newFavs[id] = html;
                localStorage.setItem('favs', JSON.stringify(newFavs))
            }
            $(this).removeClass('make-fav').addClass('remove-fav').html('<i class="fas fa-heart txt-red"></i>');

        });
        $(document).delegate('.remove-fav', 'click', function(){
            let favs = localStorage.getItem('favs');
            const id = $(this).data('id');
            if(favs){
                favs = JSON.parse(favs);
                delete favs[id];
                localStorage.setItem('favs', JSON.stringify(favs))
            }
            $(this).removeClass('remove-fav').addClass('make-fav').html('<i class="far fa-heart"></i>');
        });
        
    },
}