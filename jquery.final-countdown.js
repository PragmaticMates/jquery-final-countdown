/*!
 * jQuery Final Countdown
 *
 * @author Pragmatic Mates, http://pragmaticmates.com
 * @co-author Sewdn, http://redandivory.com
 * @version 1.2.0
 * @license GPL 2
 * @link https://github.com/PragmaticMates/jquery-final-countdown
 */

(function ($) {
    var clocks = [];
    var started = false;
    $.fn.final_countdown = function(options, callback) {
        var element = $(this);

        // Element is not visibile
        if ( ! element.is(':visible') ) {
            return;
        }

        var defaults = $.extend({
            start: '1362139200',
            end: '1388461320',
            now: '1387461319',
            selectors: {
                seconds: '.clock-seconds',
                minutes: '.clock-minutes',
                hours: '.clock-hours',
                days: '.clock-days',
                canvas: '.clock-canvas',
                val: '.val'
            },
            seconds: {
                borderColor: '#7995D5',
                borderWidth: '6'
            },
            minutes: {
                borderColor: '#ACC742',
                borderWidth: '6'
            },
            hours: {
                borderColor: '#ECEFCB',
                borderWidth: '6'
            },
            days: {
                borderColor: '#FF9900',
                borderWidth: '6'
            }
        }, options);

        var settings = $.extend({}, defaults, options);

        addClock(element, settings, callback);

        if(!started){
            startCounters();
            responsive();
            started = true;
        }
    };

    function addClock(element, settings, cb){
        var clock = {
            element: element,
            settings: settings,
            layers: {}
        };
        if (typeof cb == 'function') { // make sure the callback is a function
            clock.callbackFunction = cb;
        }

        dispatchTimer(clock);
        prepareCounters(clock);

        clocks.push(clock);
        return clock;
    }

    function responsive() {
        $(window).load(updateCircles);
        $(window).on('redraw', function() {
            switched = false;
            updateCircles();
        });
        $(window).on('resize', updateCircles);
        updateCircles();
    }

    function updateCircles() {
        var objects = ['seconds', 'minutes', 'hours', 'days'];
        var objectsLength = objects.length;
        var clocksLength = clocks.length;
        for (var i = 0; i < clocksLength; i++) {
            var clock = clocks[i];
            for (var j = 0; j < objectsLength; j++) {
                var object = objects[j];
                if(clock.layers && clock.layers[object] && clock.layers[object].draw)
                    clock.layers[object].draw();
            }
        }
    }

    function convertToDeg(degree) {
        return (Math.PI/180)*degree - (Math.PI/180)*90;
    }

    function dispatchTimer(clock) {
        var settings = clock.settings;
        clock.timer = {
            total: Math.floor((settings.end - settings.start) / 86400),
            days: Math.floor((settings.end - settings.now ) / 86400),
            hours: 24 - Math.floor(((settings.end - settings.now) % 86400) / 3600),
            minutes: 60 - Math.floor((((settings.end - settings.now) % 86400) % 3600) / 60),
            seconds: 60 - Math.floor((((settings.end - settings.now) % 86400) % 3600) % 60 )
        };
    }

    function prepareCounters(clock) {

        var durations = {
            'seconds': 60,
            'minutes': 60,
            'hours': 24
        };
        var timer = clock.timer;

        var objects = ['seconds', 'minutes', 'hours', 'days'];
        var objectsLength = objects.length;
        for (var i = 0; i < objectsLength; i++) {
            var object = objects[i];
            var element = clock.element.find([
                clock.settings.selectors[object],
                clock.settings.selectors.canvas
                ].join(" "));
            var width = $(element).width();

            var stage = new Kinetic.Stage({
                container: $(element).attr('id'),
                width: width,
                height: width
            });

            var shape = new Kinetic.Shape({
                drawFunc: function(clock, object){return function(context) {
                    var radius = width / 2 - clock.settings[object].borderWidth / 2;
                    var x = width / 2;
                    var y = width / 2;

                    context.beginPath();

                    var deg, value;
                    if(!!durations[object]){
                        deg = timer[object] * (360 / durations[object]);
                        value = durations[object] - timer[object];
                    } else {
                        if (timer.total === 0) {
                            deg = 360;
                        } else {
                            deg = (360 / timer.total) * (timer.total - timer[object]);
                        }
                        value = timer[object];
                    }

                    context.arc(x, y, radius, convertToDeg(0), convertToDeg(deg));
                    context.fillStrokeShape(this);

                    $(clock.element.find([
                        clock.settings.selectors[object],
                        clock.settings.selectors.val
                    ].join(" "))).html(value);
                }}(clock, object),
                stroke: clock.settings[object].borderColor,
                strokeWidth: clock.settings[object].borderWidth
            });
            var layer = new Kinetic.Layer();
            layer.add(shape);
            stage.add(layer);
            clock.layers[object] = layer;
        }
    }

    function draw(object){
        //for all clocks, update the specific shape
        var clocksLength = clocks.length;
        for (var i = 0; i < clocksLength; i++) {
            var clock = clocks[i];
            clock.layers[object].draw();
        }
    }

    function startCounters() {
        var interval = setInterval( function() {
            var clocksLength = clocks.length;
            for (var i = 0; i < clocksLength; i++) {
                var clock = clocks[i];
                var timer = clock.timer;
                if (timer.seconds > 59 ) {
                    if (60 - timer.minutes === 0 && 24 - timer.hours === 0 && timer.days === 0) {
                        clearInterval(interval);
                        clock.callbackFunction.call(this); // brings the scope to the callback
                        return;
                    }

                    timer.seconds = 1;

                    if (timer.minutes > 59) {
                        timer.minutes = 1;
                        //draw('minutes');
                        if (timer.hours > 23) {
                            timer.hours = 1;
                            if (timer.days > 0) {
                                timer.days--;
                                clock.layers['days'] && clock.layers['days'].draw();
                            }
                        } else {
                            timer.hours++;
                        }
                        clock.layers['hours'] && clock.layers['hours'].draw();
                    } else {
                        timer.minutes++;
                    }
                    clock.layers['minutes'] && clock.layers['minutes'].draw();
                } else {
                    timer.seconds++;
                }
                clock.layers.seconds && clock.layers.seconds.draw();
            }
        }, 1000);
    }
})(jQuery);