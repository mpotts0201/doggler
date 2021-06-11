import dynamic from 'next/dynamic'
import React from "react";
import _ from 'lib/utils/lodash'
import vr from 'velocity-react'

const animations = {
    "slideRightIn": {
        calls: [
            [{translateX: [0, "100%"]}]
        ]
    },

    "slideRightInWithFade": {
        calls: [
            [{opacity: [1, 0], translateX: [0, "100%"]}]
        ],
        defaultDuration: 600,
    },

    "slideLeftOut": {
        calls: [
            [{translateX: ["-100%", 0]}]
        ]
    },

    "slideLeftOutWithFade": {
        calls: [
            [{opacity: [0, 1], translateX: ["-100%", 0]}]
        ],
        defaultDuration: 600,
    },

    "slideLeftIn": {
        calls: [
            [{translateX: [0, "-100%"]}]
        ]
    },

    "slideLeftInWithFade": {
        calls: [
            [{opacity: [1, 0], translateX: [0, "-100%"]}]
        ],
        defaultDuration: 600,
    },

    "slideRightOut": {
        calls: [
            [{translateX: ["100%", 0]}]
        ]
    },

    "slideRightOutWithFade": {
        calls: [
            [{opacity: [0, 1], translateX: ["100%", 0]}]
        ],
        defaultDuration: 600,
    },

    "slideUpIn": {
        calls: [
            [{translateY: [0, "100%"]}]
        ]
    },

    "slideDownOut": {
        calls: [
            [{translateY: ["100%", 0]}]
        ]
    },

    "slideDownIn": {
        calls: [
            [{translateY: [0, "-100%"]}]
        ]
    },

    "slideUpOut": {
        calls: [
            [{translateY: ["-100%", 0]}]
        ]
    },

    "flipXIn": {
        defaultDuration: 600,
        calls: [
            [{opacity: [1, 0], transformPerspective: [800, 800], rotateY: ["0deg", "-180deg"]}]
        ],
        reset: {transformPerspective: 0, zIndex: 0}
    },

    "flipXOut": {
        defaultDuration: 600,
        calls: [
            [{opacity: [0, 1], transformPerspective: [800, 800], rotateY: "180deg"}]
        ],
        reset: {transformPerspective: 0, rotateY: 0, zIndex: 0}
    },
    "noop": {
        defaultDuration: 0,
        calls: []
    },

    "tada": {
        defaultDuration: 1000,
        calls: [
            [{scaleX: 0.9, scaleY: 0.9, rotateZ: -3}, 0.10],
            [{scaleX: 1.5, scaleY: 1.5, rotateZ: 3}, 0.10],
            [{scaleX: 1.5, scaleY: 1.5, rotateZ: -3}, 0.10],
            ["reverse", 0.125],
            ["reverse", 0.125],
            ["reverse", 0.125],
            ["reverse", 0.125],
            ["reverse", 0.125],
            [{scaleX: 1, scaleY: 1, rotateZ: 0}, 0.20]
        ]
    },
};

_.keys(animations).map(name => {
    animations[name].defaultDuration =  animations[name].defaultDuration || 300;
});

export const VelocityUILoader = dynamic(
    () => import('lib/animator/velocity.js').then((mod) => {
        _.keys(animations).map(name => {
            // console.log(`REGISTERED ${name}`)
            Velocity.RegisterEffect(`animator.${name}`, animations[name])
        })

        return mod;
    }),
    {
        ssr: false,
        loading: () => {
            return false
        }
    }
)


