var gallery = document.querySelector('#gallery');
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};
gallery.querySelectorAll('img').forEach(function (item) {
    item.classList.add('byebye');
    if (item.complete) {
        console.log(item.src);
    }
    else {
        item.addEventListener('load', function () {
            var altura = getVal(gallery, 'grid-auto-rows');
            var gap = getVal(gallery, 'grid-row-gap');
            var gitem = item.parentElement.parentElement;
            gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove('byebye');
        });
    }
});
window.addEventListener('resize', resizeAll);
gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
        item.classList.toggle('full');
    });
});



$(document).ready(function () {
    $(".owl_content").owlCarousel({
        rewindNav: false,
        addClassActive: true, //important
        mouseDrag: false,
        afterAction: function add_mid_class(el) {
            $('.owl-item')
                .removeClass('middle')
                .removeClass('middle_beside')
                .removeClass('next_to_mid')
                .removeClass('prev_to_mid');
            var middle_item = Math.floor($('.active').length / 2);
            middle_item--;
            $('.active').eq(middle_item - 1).addClass('middle_beside');
            $('.active').eq(middle_item).addClass('middle');
            $('.active').eq(middle_item + 1).addClass('middle_beside');
            $('.active').eq(middle_item + 1).nextAll().addClass('next_to_mid');
            $('.active').eq(middle_item - 1).prevAll().addClass('prev_to_mid');
        }
    });

    var owl = $(".owl_content").data('owlCarousel');
    $('.owl_wrapper .next').click(function () { owl.next(); });
    $('.owl_wrapper .prev').click(function () { owl.prev(); });
});


