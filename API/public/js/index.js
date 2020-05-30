import {debounce} from './general';
import superagent from 'superagent';
import slugify from 'slugify';
import $ from 'jquery';

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
function display(container, data, mode = 'append'){
    // mode will be one of overwrite, append, prepend
    let alterMethod = 'html';
    if(mode === 'append'){
        alterMethod = 'append';
    } else if(mode == 'prepend') {
        alterMethod = 'prepend';
    }
    

    // if(data.length < params.limit ){
    //     $('.btn-showmore').fadeOut(300);
    //     hideLoader();
    // }else {
    //     $('.btn-showmore').fadeIn(300);
    //     showLoader();
    // }

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
                            <button><i class="far fa-thumbs-down"></i> ( ${record.negative_votes} )</button>
                            <button><i class="far fa-thumbs-up"></i>   ( ${record.positive_votes} ) </button>
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
    },
}