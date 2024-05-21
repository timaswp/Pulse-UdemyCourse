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

    //mobile menu

    let menu = document.getElementById('menu')
    let burgerLine = document.querySelectorAll('.header__burger-line')
    let burger = document.getElementsByClassName('header__burger')[0]
    let burgerEmptyBlock = document.getElementsByClassName('header__empty-block')[0]

    $('.header__burger').on('click', function() {
        menu.classList.toggle("menu_active");
        burger.classList.toggle("header__burger_active");
        burgerEmptyBlock.classList.toggle("header__empty-block_active")
        burgerLine.forEach(function(item) {
            item.classList.toggle("header__burger-line_active");
        })
    });

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.button_buy').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    //form validation

    function validateForms (form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Указан некорректный адрес электронной почты"
                }
            }
        });
    };

    validateForms('#consultation-form')
    validateForms('#consultation form')
    validateForms('#order form')

    //form mask

    $.mask.definitions['9'] = false;
    $.mask.definitions['0']="[0-9]";
    $('input[name=phone]').mask("+994 (00) 000-00-00");
});