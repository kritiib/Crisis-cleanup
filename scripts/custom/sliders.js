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
;(function($) {
    // == Enable strict mode using use-strict directive
    "use strict";

    // == Build single slide slider
    initSingleSlideSlider($('.js-single-slider'));

    function initSingleSlideSlider(_node) {
        if(typeof _node === 'undefined') return;

        _node.each(function() {
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

                        this.slides.each(function(e) {
                            var self = this;
                            var prevDate = self.getAttribute('data-before-year');
                            var nextDate = self.getAttribute('data-after-year');

                            Array.prototype.push.apply(yearArray, [prevDate, nextDate]);
                        });

                        if (yearArray.indexOf(''+currentYear+'') !== -1) {
                            this.slides.each(function(e) {
                                var self = $(this);
                                self.filter('[data-before-year='+ currentYear +']').addClass('is-current-year');
                                self.filter('[data-after-year='+ currentYear +']').addClass('is-current-year');
                            });
                        }
                    },
                },
            });
        });
    }

})(jQuery); // Self invoking function - IIFE