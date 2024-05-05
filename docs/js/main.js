$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron left solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron right solid.svg"></button>'
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }

    toggleSlide('.catalog-item__link')
    toggleSlide('.catalog-item__back-link')

    $('ul.menu__list').on('click', 'li:not(.menu__list-item_active)', function() {
        $(this)
        .addClass('menu__list-item_active').siblings().removeClass('menu__list-item_active')
    });
});

let menu = document.getElementById('menu')
let burgerLine = document.querySelectorAll('.header__burger-line')

function toggleMenu() {
    menu.classList.toggle("menu_active");
    burgerLine.forEach(function(item) {
        item.classList.toggle("header__burger-line_active");
    });
}