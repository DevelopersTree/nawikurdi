import superagent from 'superagent';
import $ from 'jquery';
import { Notyf } from 'notyf';
// Create an instance of Notyf
const notyf = new Notyf();


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
        let favs = localStorage.getItem('favs');
        try{
            favs = JSON.parse(favs);
            for (var key in favs) {
                if (favs.hasOwnProperty(key)) {
                  var val = favs[key];
                  $('.names-container').append(val)
                }
            }
        }catch(e){
            console.log(e)
        }
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
