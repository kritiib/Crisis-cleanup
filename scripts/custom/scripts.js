/**
 * Common javascript codes
 */

;(function (w, d, $) {

    /* ========================= Helper functions based on vanilla javascript ============================ */

    /**
     * @param el
     * @param _nodeClass
     * @returns {HTMLElement}
     * @private
     */
    function _findAncestor(el, _nodeClass) {
        while ((el = el.parentElement) && !el.classList.contains(_nodeClass)) ;
        return el;
    }

    /**
     * Get siblings of an element
     * @param  {Element} elem
     * @return {Object}
     */
    var getSiblings = function (elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        var skipMe = elem;
        for (; sibling; sibling = sibling.nextSibling)
            if (sibling.nodeType == 1 && sibling != skipMe)
                siblings.push(sibling);
        return siblings;
    };

    /**
     * Build a function to attach mouse enter event handler on sidebar navigation items
     */
    Array.prototype.forEach.call(d.querySelectorAll('.js-navbar-item'), function (ele) {
        ele.addEventListener('mouseenter', function () {
            ele.classList.add('is-active');
            $(ele).find('.navbar-submenu').slideDown(300);
            _findAncestor(ele, 'navbar-nav').classList.add('is-submenu-shown');
        });

        ele.addEventListener('mouseleave', function () {
            ele.classList.remove('is-active');
            $(ele).find('.navbar-submenu').slideUp(300);
            _findAncestor(ele, 'navbar-nav').classList.remove('is-submenu-shown');
        });
    });

    /**
     * Perfect scrollbar initialization
     */

    $('.js-ps-scrollbar').each(function () {
        const ps = new PerfectScrollbar($(this)[0], {
            suppressScrollX: true
        });
    });

    /**
     * Get Video ID from given video url
     */

    //Parse video host name and vide id from the given url
    function parseVideoURL(url) {
        function getParm(url, base) {
            var re = new RegExp("(\\?|&)" + base + "\\=([^&]*)(&|$)");
            var matches = url.match(re);
            if (matches) {
                return (matches[2]);
            } else {
                return ("");
            }
        }

        var retVal = {};
        var matches;
        if (url.indexOf("youtube.com/watch") != -1) {
            retVal.provider = "youtube";
            retVal.id = getParm(url, "v");
        } else if (matches = url.match(/vimeo.com\/(\d+)/)) {
            retVal.provider = "vimeo";
            retVal.id = matches[1];
        } else if (matches = url.split('?')[0].split("/")) {
            retVal.provider = "vimeo";
            retVal.id = matches[matches.length - 1];
        }
        return (retVal);
    }

    /**
     * Function to update iframe src with extracted video id and play it inline
     */

    playVideoInline($('.js-video-play'));

    function playVideoInline(_node) {
        if (typeof _node === 'undefined') return;
        _node.each(function() {
           var $self = $(this),
               videoUrl = $self.attr('data-video-url'),
               $parent = $self.closest('.js-video-container'),
               $targetIframe = $parent.find('.js-video-item');

            // Get Video ID from url
            var videoSource = parseVideoURL(videoUrl),
                videoProvider= videoSource.provider,
                loadedVideoId = videoSource.id;

           var youtubeVideoParams = 'https://www.youtube.com/embed/'+loadedVideoId+'?modestbranding=1&rel=0&showinfo=0&autoplay=1&autohide=1&controls=1&loop=1';
           var vimeoVideoParams = 'https://player.vimeo.com/video/'+loadedVideoId+'autoplay=1&fullscreen=1&title=0&byline=0';

           $self.on('click', function(e) {
               $parent.addClass('is-video-playing');

               if (videoProvider === 'youtube') {
                   $targetIframe.attr('src', youtubeVideoParams);
               } else if (videoProvider === 'vimeo') {
                   $targetIframe.attr('src', vimeoVideoParams);
               }

               e.preventDefault();
           });

        });
    }

})(window, document, jQuery);