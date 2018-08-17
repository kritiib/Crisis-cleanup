/**
 * @name: sliders.js
 * @desc: creating slider using swiper's library
 */

/**
 * Wrap all javascript snippets inside a javascript clousure
 * to avoid potential code conflict with
 * other libraries and codes ***
 * ';' infront of the IIFE is for security purpose, i.e. to run our code in safe mode.
 * Because when we try to compress/optimize our js code, compiler/optimizer try to concatenate our code with other js codes
 * and it throws an error if it detects a statement without ending with ';' and breaks whole code!
 * To fix this issue, it's always safe to add ';' infront of our IIFE which ensures compiler won't throw any error even if a statement doesn't ends at ';'
 */

// Wrap javascript code inside a clouser to avoid possible conflicts with other codes
;(function ($) {
    // == Enable strict mode using use-strict directive
    "use strict";

    // == Build single slide slider
    initSingleSlideSlider($('.js-single-slider'));

    function initSingleSlideSlider(_node) {
        if (typeof _node === 'undefined') return;

        _node.each(function () {
            var $self = $(this);

            var counterSwiper = new Swiper($self, {
                autoplay: false,
                navigation: {
                    nextEl: $self.closest('.js-single-slider-parent').find('.js-single-slider-next-button'),
                    prevEl: $self.closest('.js-single-slider-parent').find('.js-single-slider-prev-button'),
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: 'bullets',
                },
                speed: 500,
                spaceBetween: 0,
                on: {
                    init: function () {
                        // == Add class after the initialization of swiper
                        this.$el[0].classList.add('swiper-initialized');

                        // == Check length of slides
                        var slidesLength = this.slides.length;

                        if (slidesLength <= 1) this.$el[0].classList.add('swiper-disabled');

                        // == Check if current year equals to the year on slides
                        var currentYear = (new Date()).getFullYear();

                        var yearArray = [];

                        this.slides.each(function (e) {
                            var self = this;
                            var prevDate = self.getAttribute('data-before-year');
                            var nextDate = self.getAttribute('data-after-year');

                            Array.prototype.push.apply(yearArray, [prevDate, nextDate]);
                        });

                        if (yearArray.indexOf('' + currentYear + '') !== -1) {
                            this.slides.each(function (e) {
                                var self = $(this);
                                self.filter('[data-before-year=' + currentYear + ']').addClass('is-current-year');
                                self.filter('[data-after-year=' + currentYear + ']').addClass('is-current-year');
                            });
                        }
                    },
                },
            });
        });
    }

    // == Helper function to add classes to all visible slides on carousel
    function _getVisibleSlidesOnCarousel(_this) {
        var indexLeft = _this.realIndex; //Index number of left slide per view in loop mode
        var indexRight = _this.realIndex + _this.params.slidesPerView; //Index number of right slide per view in loop mode

        Array.prototype.forEach.call(document.querySelectorAll('.js-staffs-carousel-parent .swiper-slide'), function (e) {
            e.classList.remove('is-active-carousel-slide');
        });

        $(_this.$el[0]).find('.swiper-slide').slice(indexLeft, indexRight).addClass('is-active-carousel-slide');
    }

    // == Build staffs carousel
    initStaffCarousel($('.js-staffs-carousel'));

    function initStaffCarousel(_node) {
        if (typeof _node === 'undefined') return;

        _node.each(function () {
            var $self = $(this);

            var staffCarousel = new Swiper($self, {
                autoplay: false,
                navigation: {
                    nextEl: $self.closest('.js-staffs-carousel-parent').find('.js-carousel-next-button'),
                    prevEl: $self.closest('.js-staffs-carousel-parent').find('.js-carousel-prev-button'),
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: 'bullets',
                },
                speed: 500,
                slidesPerView: 6,
                slidesPerGroup: 6,
                spaceBetween: 20,
                on: {
                    init: function () {
                        // == Add class after the initialization of swiper
                        this.$el[0].classList.add('swiper-initialized');
                        _getVisibleSlidesOnCarousel(this);
                    },
                    slideChange: function () {
                        _getVisibleSlidesOnCarousel(this);
                    }
                },
            });
        });
    }

})(jQuery); // Self invoking function - IIFE