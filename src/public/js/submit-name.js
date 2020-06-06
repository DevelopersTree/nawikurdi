import superagent from 'superagent';
import $ from 'jquery';
import { Notyf } from 'notyf';
// Create an instance of Notyf


// scroll logic
let mybutton = document.getElementById("to-top");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    try{
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
          } else {
            mybutton.style.display = "none";
          }
    }catch(e){}

}
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const notyf = new Notyf();
function submitname(data, cb = ()=>{}){
    return superagent
        .post(`/api`)
        .send(data)
        .end((err, res)=>{
            cb(err, res)
        });
}
module.exports = {
    init: function() {    
        window.topFunction = topFunction;

        $('.submit-button').click(function(){
            const btn = this;
            const submited_name = {
                desc: '   ',
                gender: 'O',
            };
            const gender = `${$('select[name=gender]').val()}`.trim();
            const name = `${$('input[name=name]').val()}`.trim();
            const desc = `${$('input[name=desc]').val()}`.trim();
            if (name!= '' && gender) {
                // submitname(name).then((result) => {
                //   if (result.data.status === 1) {
                //     alert('سوپاس لە ماوەیەکی کەمدا ناوەکات لە پەڕەکە دەردەجێت');
                //     this.setState({ open: false });
                //   } else {
                //     alert('ببورە ناوەکەت زیاد نەکرا تکایە دوبارەی بکەوە');
                //   }
                // }).catch(() => {
                //   // error handling goes here
                // });
                submitname({
                    ...submited_name,
                    name: name,
                    gender: gender,
                    desc: desc,
                },
                (err, res)=>{
                    if(err){
                        // const errors = err.response.body.errors;
                        // notyf.error(errors[0].msg);
                        notyf.error('هەڵەیەک رویدا لەکاتی ناردنی ناوی نوێ')
                    } else {
                       notyf.success('ناوەکەت بە سەرکەوتویی نێردرا');
                       $('input[name=name]').val('')
                       $('input[name=desc]').val('')
                    }
                })
            } else {
                console.log(name, gender)
                notyf.error('ناو و رەگەز پێویستە بۆ ناردنی ناوێکی نوێ')
            }
            
        });
        
    },
}
