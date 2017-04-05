/**
 * Created by AYUSH on 2/13/2017.
 */




$(function () {
    $(" .dropdown ").hover(
        function () {
            $('.dropdown-menu', this).stop(true, true).fadeIn("fast");
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).stop(true, true).fadeOut("fast");
            $(this).toggleClass('open');
        });
});

$(document).ready(function () {
    $(" .example ").smartmarquee({

        // animate duration
        duration: 1000,

        // auto loop
        loop: true,

        // interval duration
        interval: 1,

        // 'vertical' or 'horizontal'
        axis: "vertical"

    });
});

var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1
    }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 4000); // Change image every 2 seconds
}

var slideIndexx = 1;
showDivs(slideIndexx);

function plusDivs(n) {
    showDivs(slideIndexx += n);
}

function currentDiv(n) {
    showDivs(slideIndexx = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {
        slideIndexx = 1
    }
    if (n < 1) {
        slideIndexx = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    x[slideIndexx - 1].style.display = "block";
    dots[slideIndexx - 1].className += " w3-white";
    //setTimeout(showDivs(n+1), 2000); // Change image every 2 seconds
}

