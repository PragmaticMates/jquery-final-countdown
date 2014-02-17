jQuery Final Countdown
======================

http://final-countdown.pragmaticmates.com/demo

Requirements
------------
- jQuery http://jquery.com
- Kinetic http://kineticjs.com

Javascript Code
---------------
::

	$(document).ready(function() {
		$('.countdown').final_countdown({});
	});

HTML Template
-------------
::

	<div class="countdown-container container">
	    <div class="clock row">
	        <div class="clock-item clock-days countdown-time-value col-sm-6 col-md-3">
	            <div class="wrap">
	                <div class="inner">
	                    <div id="canvas_days" class="clock-canvas"></div>

	                    <div class="text">
	                        <p class="val">0</p>
	                        <p class="type-days type-time">DAYS</p>
	                    </div><!-- /.text -->
	                </div><!-- /.inner -->
	            </div><!-- /.wrap -->
	        </div><!-- /.clock-item -->

	        <div class="clock-item clock-hours countdown-time-value col-sm-6 col-md-3">
	            <div class="wrap">
	                <div class="inner">
	                    <div id="canvas_hours" class="clock-canvas"></div>

	                    <div class="text">
	                        <p class="val">0</p>
	                        <p class="type-hours type-time">HOURS</p>
	                    </div><!-- /.text -->
	                </div><!-- /.inner -->
	            </div><!-- /.wrap -->
	        </div><!-- /.clock-item -->

	        <div class="clock-item clock-minutes countdown-time-value col-sm-6 col-md-3">
	            <div class="wrap">
	                <div class="inner">
	                    <div id="canvas_minutes" class="clock-canvas"></div>

	                    <div class="text">
	                        <p class="val">0</p>
	                        <p class="type-minutes type-time">MINUTES</p>
	                    </div><!-- /.text -->
	                </div><!-- /.inner -->
	            </div><!-- /.wrap -->
	        </div><!-- /.clock-item -->

	        <div class="clock-item clock-seconds countdown-time-value col-sm-6 col-md-3">
	            <div class="wrap">
	                <div class="inner">
	                    <div id="canvas_seconds" class="clock-canvas"></div>

	                    <div class="text">
	                        <p class="val">0</p>
	                        <p class="type-seconds type-time">SECONDS</p>
	                    </div><!-- /.text -->
	                </div><!-- /.inner -->
	            </div><!-- /.wrap -->
	        </div><!-- /.clock-item -->
	    </div><!-- /.clock -->
	</div><!-- /.countdown-wrapper -->

Default Settings
----------------
::

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