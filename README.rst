jQuery Final Countdown
======================

Requirements
------------
- jQuery http://www.jquery.com
- Kinetic http://http://kineticjs.com

Defaults
--------
''''
var defaults = $.extend({
    start: '1362139200',
    end: '1388461320',
    now: '1387461319',
    selectors: {
        value_seconds: '.clock-seconds .val',
        canvas_seconds: 'canvas_seconds',
        value_minutes: '.clock-minutes .val',
        canvas_minutes: 'canvas_minutes',
        value_hours: '.clock-hours .val',
        canvas_hours: 'canvas_hours',
        value_days: '.clock-days .val',
        canvas_days: 'canvas_days'
    },
    seconds: {
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: '5'
    },
    minutes: {
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: '5'
    },
    hours: {
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: '5'
    },
    days: {
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: '5'
    }
}, options);
''''