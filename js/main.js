/* DESKTOP */

function pJS_desktop() {
    particlesJS('particles-js', {
        particles: {
            color: '#fff',
            shape: 'circle',
            opacity: 1,
            size: 10.5,
            size_random: true,
            nb: 150,
            line_linked: {
                enable_auto: true,
                distance: 250,
                color: '#fff',
                opacity: 0.5,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 3
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 200
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
                opacity: 1
            },
            events: {
                onclick: {
                    enable: true,
                    mode: 'push',
                    nb: 10
                }
            }
        },
        retina_detect: true
    });
}



/* MOBILE / TABLET */

function pJS_mobile() {
    particlesJS('particles-js', {
        particles: {
            color: '#fff',
            shape: 'circle',
            opacity: 1,
            size: 2.5,
            size_random: true,
            nb: 40,
            line_linked: {
                enable_auto: false,
                distance: 250,
                color: '#fff',
                opacity: 0.5,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 3
            }
        },
        interactivity: {
            enable: false,
            mouse: {
                distance: 200
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
                opacity: .5
            },
            events: {
                onclick: {
                    enable: true,
                    mode: 'push',
                    nb: 4
                }
            }
        },
        retina_detect: true
    });
}


/* LAUNCH */

if (window.innerWidth > 1100) {
    pJS_desktop();
} else {
    pJS_mobile();
}

/* on resize */

window.addEventListener('resize', function () {
    checkOnResize();
}, true);

function checkOnResize() {
    if (window.innerWidth > 1100) {
        if (pJS.particles.nb != 150) {
            console.log('desktop mode')
            pJS.fn.vendors.destroy();
            pJS_desktop();
        }
    } else {
        if (pJS.particles.nb == 150) {
            console.log('mobile mode');
            pJS.fn.vendors.destroy();
            pJS_mobile();
        }
    }
}

Leap.loop({
    hand: function (hand) {

        var pos = hand.screenPosition();
        if (pJS) {

            pJS.interactivity.mouse.pos_x = pos[0] + 100;
            pJS.interactivity.mouse.pos_y = pos[1] + 350;

            if (pJS.retina) {
                pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
                pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
            }

            pJS.interactivity.status = 'mousemove';
        }
    }

}).use('screenPosition', {scale: 0.70});


$('#particles-js').click(function () {
    if (pJS) {
        for (var i = 0; i < pJS.interactivity.events.onclick.nb; i++) {
            pJS.particles.array.push(
                    new pJS.fn.particle(
                            pJS.particles.color_rgb,
                            pJS.particles.opacity,
                            {
                                'x': pJS.interactivity.mouse.pos_x,
                                'y': pJS.interactivity.mouse.pos_y
                            }
                    )
                    )
        }
    }
});
