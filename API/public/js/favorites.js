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
        window.topFunction = topFunction;
        
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
        $(document).delegate('.remove-fav', 'click', function(){
            let favs = localStorage.getItem('favs');
            let fav_ids = localStorage.getItem('fav_ids');

            const id = $(this).data('id');
            if(favs){
                favs = JSON.parse(favs);
                delete favs[id];
                localStorage.setItem('favs', JSON.stringify(favs))
            }
            if(fav_ids){
                fav_ids = fav_ids.split(',');
                const index = fav_ids.indexOf(id+"");
                console.log(fav_ids)
                if (index > -1) {
                    fav_ids.splice(index, 1);
                }
                localStorage.setItem('fav_ids', fav_ids.join(','))
            }
            $(this).parents('.card-container').remove()
        });
        
    },
}
