/* eslint-env browser */
(function (document) {
    'use strict';

    var cutsMustard = (
        'addEventListener' in window &&
        'forEach' in Array.prototype
    );

    if (!cutsMustard) {
        return;
    }

    function hasClass(el, cl) {
        var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
        return Boolean(el.className.match(regex));
    }

    function addClass(el, cl) {
        el.className += ' ' + cl;
    }

    function removeClass(el, cl) {
        var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
        el.className = el.className.replace(regex, ' ');
    }

    function toggleClass(el, cl) {
        if (hasClass(el, cl)) {
            removeClass(el, cl);
        } else {
            addClass(el, cl);
        }
    }

    function sectionNavigtion() {
        var select = document.getElementById('sg-section-switcher');
        if (select) {
            select.addEventListener('change', function () {
                var val = this.value;
                if (val) {
                    window.location = val;
                }
            });
        }
    }

    sectionNavigtion();
})(document);
