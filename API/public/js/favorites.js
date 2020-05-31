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
        // $(document).delegate('.make-fav', 'click', function(){
        //     let favs = localStorage.getItem('favs');
        //     const id = $(this).data('id');
        //     const html  = `<a class="col col-3 col-md col-sm card-container">${$(this).parents('.card-container').html()}</a>` ;
        //     console.log(html)
        //     if(favs){
        //         favs = JSON.parse(favs);
        //         favs[id] = html;
        //         localStorage.setItem('favs', JSON.stringify(favs))
        //     } else {
        //         const newFavs = {};
        //         newFavs[id] = html;
        //         localStorage.setItem('favs', JSON.stringify(newFavs))
        //     }
        //     $(this).removeClass('make-fav').addClass('remove-fav').html('<i class="fas fa-heart txt-red"></i>');

        // });
        // $(document).delegate('.remove-fav', 'click', function(){
        //     let favs = localStorage.getItem('favs');
        //     const id = $(this).data('id');
        //     if(favs){
        //         favs = JSON.parse(favs);
        //         delete favs[id];
        //         localStorage.setItem('favs', JSON.stringify(favs))
        //     }
        //     $(this).removeClass('remove-fav').addClass('make-fav').html('<i class="far fa-heart"></i>');
        // });
        
    },
}
