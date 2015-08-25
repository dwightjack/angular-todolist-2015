/* global TweenMax */

import 'gsap';

function todoAnimation() {

    return {
        enter(element, doneFn) {
            TweenMax.from(element, 0.3, {
                height: 0,
                x: -10,
                onComplete: doneFn
            });
        },

        leave(element, doneFn) {
            TweenMax.to(element, 0.3, {
                height: 0,
                x: -10,
                autoAlpha: 0,
                onComplete: doneFn
            });
        }
    };

}


export default todoAnimation;