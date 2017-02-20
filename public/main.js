/**
 * Created by AYUSH on 2/13/2017.
 */
//
// var p=0;
// //var s=document.getElementById("news1");
// function a(p){
//
//     $('#news1').css('marginTop',Number(p)+'px');
//
//
// }
//
//     $(document).ready(setInterval(function()
//     {
//
//         var i;
//         for(i=1;i<105;i++)
//         {
//
//             a(i);
//             //console.log(a);
//         }
//
//   //      s.style.display='none';
//
//     },5000)
//
//
//
//
//    );



// var instance = $('.newsticker').data('plugin_announcement');
// $(function() {
//     $('.newsticker').announcement();
// });

$(function(){
    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
            $(this).toggleClass('open');
        });
});

$(document).ready(function () {
    $(".example").smartmarquee({

        // animate duration
        duration: 1000,

        // auto loop
        loop : true,

        // interval duration
        interval : 1,

        // 'vertical' or 'horizontal'
        axis : "vertical"

    });
});