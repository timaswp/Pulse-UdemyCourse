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
let burger = document.getElementsByClassName('header__burger')[0]
let burgerEmptyBlock = document.getElementsByClassName('header__empty-block')[0]

function toggleMenu() {
    menu.classList.toggle("menu_active");
    burger.classList.toggle("header__burger_active");
    burgerEmptyBlock.classList.toggle("header__empty-block_active")
    burgerLine.forEach(function(item) {
        item.classList.toggle("header__burger-line_active");
    });
}

// let itemDescription = document.querySelectorAll('.catalog-item___descr')

// function backlinkFloat() {
//     if itemDescription
// }

// Получаем ссылку на элементы
let itemDescription = document.getElementsByClassName('.catalog-item___descr')[0];
let backLink = document.getElementsByClassName('catalog-item__back-link')[1];

// Создаем наблюдателя изменений для отслеживания изменений высоты элемента about-link
let observer = new MutationObserver(function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        // Проверяем, является ли мутация изменением атрибута стиля "height"
        if (mutation.attributeName === 'style') {
            // Проверяем, превышает ли новая высота элемента about-link 40 пикселей
            if (parseInt(itemDescription.style.height) > 40) {
                // Изменяем атрибут bottom элемента home-link на 20px
                backLink.style.bottom = '10px';
            } else {
                // Изменяем атрибут bottom элемента home-link на 10px
                backLink.style.bottom = '30px';
            }
        }
    }
});

// Настройка наблюдателя для отслеживания изменений атрибута стиля "height" у элемента about-link
// observer.observe(itemDescription, { attributes: true, attributeFilter: ['style'] });

function addObserverIfDesiredNodeAvailable() {
    if(!itemDescription) {
        //The node we need does not exist yet.
        //Wait 500ms and try again
        window.setTimeout(addObserverIfDesiredNodeAvailable,500);
        return;
    }
    // var config = {childList: true};
    observer.observe(itemDescription, { attributes: true, attributeFilter: ['style'] });
}
addObserverIfDesiredNodeAvailable();