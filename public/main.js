/**
 * Created by AYUSH on 2/13/2017.
 */




$(function(){
    $(" .dropdown ").hover(
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
    $(" .example ").smartmarquee({

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

