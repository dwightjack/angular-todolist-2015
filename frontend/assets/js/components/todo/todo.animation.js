/* global TweenMax */

require('gsap');

module.exports = function todoAnimation() {

    return {
        enter: function enter(element, doneFn) {
            TweenMax.from(element, 0.3, {
                height: 0,
                x: -10,
                autoAlpha: 0,
                onComplete: doneFn
            });
        },

        leave: function leave(element, doneFn) {
            TweenMax.to(element, 0.3, {
                height: 0,
                x: -10,
                autoAlpha: 0,
                onComplete: doneFn
            });
        }
    };

};