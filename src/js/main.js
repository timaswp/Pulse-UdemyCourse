$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron left solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron right solid.svg"></button>'
    });
});