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
        for ( ; sibling; sibling = sibling.nextSibling )
            if ( sibling.nodeType == 1 && sibling != skipMe )
                siblings.push( sibling );
        return siblings;
    };

    /**
     * Build a function to attach mouse enter event handler on sidebar navigation items
     */
    Array.prototype.forEach.call(d.querySelectorAll('.js-navbar-item'), function (ele) {
        ele.addEventListener('mouseenter', function () {
            ele.classList.add('is-active');
            _findAncestor(ele, 'navbar-nav').classList.add('is-submenu-shown');
        });

        ele.addEventListener('mouseleave', function () {
            ele.classList.remove('is-active');
            _findAncestor(ele, 'navbar-nav').classList.remove('is-submenu-shown');
        });
    });

})(window, document, jQuery);