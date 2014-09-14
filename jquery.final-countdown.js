/* globals Kinetic */
/*!
 * jQuery Final Countdown
 *
 * @author Pragmatic Mates, http://pragmaticmates.com
 * @author Alexander Heimbuch, http://zusatzstoff.org
 * 
 * @version 1.1.1
 * @license GPL 2
 * @link https://github.com/PragmaticMates/jquery-final-countdown
 */
(function ($) {
    'use strict';

    function FinalCountdown (selector, options, callback) {
        this.timer = undefined;
        this.interval = undefined;

        this.circleSeconds = undefined;
        this.circleMinutes = undefined;
        this.circleHours = undefined;
        this.circleDays = undefined;

        this.layerSeconds = undefined;
        this.layerMinutes = undefined;
        this.layerHours = undefined;
        this.layerDays = undefined;

        this.callbackFunction = undefined;
        this.element = $(selector);     

        var defaults = $.extend({
            start: undefined,
            end: undefined,
            now: undefined,
            selectors: {
                value_seconds: '.clock-seconds .val',
                canvas_seconds: '.canvas-seconds',
                value_minutes: '.clock-minutes .val',
                canvas_minutes: '.canvas-minutes',
                value_hours: '.clock-hours .val',
                canvas_hours: '.canvas-hours',
                value_days: '.clock-hours .val',
                canvas_days: '.canvas-hours'
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
                borderColor: '#ECEFCB',
                borderWidth: '6'
            }
        }, options);

        this.settings = $.extend({}, defaults, options);

        if (this.settings.start === undefined) {
            this.settings.start = this.element.data('start');
        }

        if (this.settings.end === undefined) {
            this.settings.end = this.element.data('end');
        }

        if (this.settings.now === undefined) {
            this.settings.now = this.element.data('now');
        }

        if (this.element.data('border-color')) {
            this.settings.seconds.borderColor = this.settings.minutes.borderColor = this.settings.hours.borderColor = this.settings.days.borderColor = this.element.data('border-color');
        }

        if (this.settings.now < this.settings.start ) {
            this.settings.start = this.settings.now;
            this.settings.end = this.settings.now;
        }

        if (this.settings.now > this.settings.end) {
            this.settings.start = this.settings.now;
            this.settings.end = this.settings.now;
        }

        if (typeof callback === 'function') { // make sure the callback is a function
            this.callbackFunction = callback;
        }
        
        // Bind events to window for responsive scaling
        this.scale();
        
        if (this.settings.start !== undefined && this.settings.end !== undefined && this.settings.now !== undefined) {
            this.set(this.settings.start, this.settings.end, this.settings.now);
            this.prepare();
            this.start();
        }
    }

    FinalCountdown.prototype = {

        set : function (startTime, endTime, currentTime) {
            this.timer = {
                total: Math.floor((endTime - startTime) / 86400),
                hours: 24 - Math.floor(((endTime - currentTime) % 86400) / 3600),
                minutes: 60 - Math.floor((((endTime - currentTime) % 86400) % 3600) / 60),
                seconds: 60 - Math.floor((((endTime - currentTime) % 86400) % 3600) % 60 )
            };
            this.prepare();
        },

        update : function () {
            if (this.layerSeconds !== undefined) {
                this.layerSeconds.draw();
            }
            
            if (this.layerMinutes !== undefined) {
                this.layerMinutes.draw();
            }

            if (this.layerMinutes !== undefined) {
                this.layerHours.draw();
            }
        },

        scale : function () {
            $(window).load(this.update);

            $(window).on('redraw', function () {
                this.update();
            });

            $(window).on('resize', this.update);
        },

        prepare : function () {
            // Seconds
            this.prepareSeconds();
            // Minutes
            this.prepareMinutes();
            // Hours
            this.prepareHours();
            // Days
            this.prepareDays();
        },

        prepareSeconds : function () {
            if (this.element.find(this.settings.selectors.canvas_seconds).length === 0) {
                this.layerSeconds = { draw: function () {} };
                return;
            }

            var self = this,
            secondsWidth = this.element.find(this.settings.selectors.canvas_seconds).width(),
            secondsStage = new Kinetic.Stage({
                container: self.element.find(self.settings.selectors.canvas_seconds).get(0),
                width: secondsWidth,
                height: secondsWidth
            });

            this.circleSeconds = new Kinetic.Shape({
                drawFunc: function (context) {
                    var radius = secondsWidth / 2 - self.settings.seconds.borderWidth / 2,
                    x = secondsWidth / 2,
                    y = secondsWidth / 2;

                    context.beginPath();
                    context.arc(x, y, radius, convertToDeg(0), convertToDeg(self.timer.seconds * 6));
                    context.fillStrokeShape(this);

                    self.element.find(self.settings.selectors.value_seconds).html(60 - self.timer.seconds);
                },
                stroke: self.settings.seconds.borderColor,
                strokeWidth: self.settings.seconds.borderWidth
            });

            this.layerSeconds = new Kinetic.Layer();
            this.layerSeconds.add(this.circleSeconds);
            secondsStage.add(this.layerSeconds);
        },

        prepareMinutes : function () {
            if (this.element.find(this.settings.selectors.canvas_minutes).length === 0) {
                this.layerMinutes = { draw: function () {} };
                return;
            }

            var self = this,
            minutesWidth = this.element.find(this.settings.selectors.canvas_minutes).width(),
            minutesStage = new Kinetic.Stage({
                container: self.element.find(self.settings.selectors.canvas_minutes).get(0),
                width: minutesWidth,
                height: minutesWidth
            });

            this.circleMinutes = new Kinetic.Shape({
                drawFunc: function (context) {
                    var radius = minutesWidth / 2 - self.settings.minutes.borderWidth / 2,
                    x = minutesWidth / 2,
                    y = minutesWidth / 2;

                    context.beginPath();
                    context.arc(x, y, radius, convertToDeg(0), convertToDeg(self.timer.minutes * 6));
                    context.fillStrokeShape(this);

                    self.element.find(self.settings.selectors.value_minutes).html(60 - self.timer.minutes);

                },
                stroke: self.settings.minutes.borderColor,
                strokeWidth: self.settings.minutes.borderWidth
            });

            this.layerMinutes = new Kinetic.Layer();
            this.layerMinutes.add(this.circleMinutes);
                minutesStage.add(this.layerMinutes);
        },

        prepareHours : function () {
            if (this.element.find(this.settings.selectors.canvas_hours).length === 0) {
                this.layerHours = { draw: function () {} };
                return;
            }

            var self = this,
            hoursWidth = this.element.find(this.settings.selectors.canvas_hours).width(),
            hoursStage = new Kinetic.Stage({
                container: self.element.find(self.settings.selectors.canvas_hours).get(0),
                width: hoursWidth,
                height: hoursWidth
            });

            this.circleHours = new Kinetic.Shape({
                drawFunc: function(context) {
                    var radius = hoursWidth / 2 - self.settings.hours.borderWidth/2,
                    x = hoursWidth / 2,
                    y = hoursWidth / 2;

                    context.beginPath();
                    context.arc(x, y, radius, convertToDeg(0), convertToDeg(self.timer.hours * 360 / 24));
                    context.fillStrokeShape(this);

                    self.element.find(self.settings.selectors.value_hours).html(24 - self.timer.hours);
                },
                stroke: self.settings.hours.borderColor,
                strokeWidth: self.settings.hours.borderWidth
            });

            this.layerHours = new Kinetic.Layer();
            this.layerHours.add(this.circleHours);
            hoursStage.add(this.layerHours);
        },

        prepareDays : function () {
            if (this.element.find(this.settings.selectors.canvas_days).length === 0) {
                this.layerDays = { draw: function() {} };
                return;
            }

            var self = this,
            daysWidth = this.element.find(this.settings.selectors.canvas_days).width(),
            DaysStage = new Kinetic.Stage({
                container: self.element.find(self.settings.selectors.canvas_days).get(0),
                width: daysWidth,
                height: daysWidth
            });

            this.circleDays = new Kinetic.Shape({
                drawFunc: function(context) {
                    var radius = daysWidth / 2 - self.settings.days.borderWidth/2,
                    x = daysWidth / 2,
                    y = daysWidth / 2;

                    context.beginPath();

                    context.arc(x, y, radius, convertToDeg(0), convertToDeg(self.timer.days * 360 / 24));
                    context.fillStrokeShape(this);

                    self.element.find(self.settings.selectors.value_Days).html(24 - self.timer.days);
                },
                stroke: self.settings.days.borderColor,
                strokeWidth: self.settings.days.borderWidth
            });

            this.layerDays = new Kinetic.Layer();
            this.layerDays.add(this.circleDays);
            DaysStage.add(this.layerDays);
        },

        start : function () {
            var self = this;

            if (this.interval !== undefined) {
                return false;
            }

            this.interval = setInterval( function() {                        
                if (self.timer.seconds > 59 ) {

                    if (60 - self.timer.minutes === 0 && 24 - self.timer.hours === 0 && self.timer.days === 0) {
                        clearInterval(self.interval);
                        if (self.callbackFunction !== undefined) {
                            self.callbackFunction.call(this); // brings the scope to the callback
                        }
                        return;
                    }

                    self.timer.seconds = 1;

                    if (self.timer.minutes > 59) {
                        self.timer.minutes = 1;
                        self.layerMinutes.draw();

                        if (self.timer.hours > 23) {
                            self.timer.hours = 1;

                            if (self.timer.days > 0) {
                                self.timer.days--;
                                self.layerDays.draw();
                            }
                        } else {                        
                            self.timer.hours++;
                        }     

                        self.layerHours.draw();

                    } else {
                        self.timer.minutes++;
                    }

                    self.layerMinutes.draw();

                } else {            
                    self.timer.seconds++;
                }

                self.layerSeconds.draw();
            }, 1000);
        },

        stop : function () {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    };

    $.fn.final_countdown = function(options, callback) {
        return new FinalCountdown(this, options, callback);
    };

    function convertToDeg(degree) {
        return (Math.PI/180)*degree - (Math.PI/180)*90;
    }
})(jQuery);
