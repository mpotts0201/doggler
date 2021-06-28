import './effects';

export const motions = {
    "slide-left": {
        enter: "animator.slideRightIn",
        leave: "animator.slideLeftOut"
    },

    "slide-right": {
        enter: "animator.slideLeftIn",
        leave: "animator.slideRightOut"
    },

    "slide-left-fade": {
        enter: "animator.slideRightInWithFade",
        leave: "animator.slideLeftOutWithFade",
    },

    "slide-right-fade": {
        enter: "animator.slideLeftInWithFade",
        leave: "animator.slideRightOutWithFade",
    },

    "flip-x": {
        enter: {animation: "animator.flipXIn", style: {backfaceVisibility: 'hidden', zIndex: 2}},
        leave: {animation: "animator.flipXOut", style: {backfaceVisibility: 'hidden', zIndex: 0}}
    },

    "drawer-left": {
        enter: "animator.slideLeftIn",
        leave: "animator.slideLeftOut"
    },

    "drawer-right": {
        enter: "animator.slideRightIn",
        leave: "animator.slideRightOut"
    },

    "expand": {
        enter: "transition.expandIn",
        leave: "transition.expandOut"
    },

    "drawer-bottom": {
        enter: "animator.slideUpIn",
        leave: "animator.slideDownOut"
    },

    "drawer-top": {
        enter: "animator.slideDownIn",
        leave: "animator.slideUpOut"
    },

    "cross-fade": {
        enter: {animation: "transition.fadeIn", duration: 3000},
        leave: {animation: "transition.fadeOut", duration: 3000}
    }
};

export const transitions = {
    "slide-left": "slide-right",
    "slide-right": "slide-left"
};



