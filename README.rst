jQuery Final Countdown
======================

- http://final-countdown.pragmaticmates.com/demo/index.html
- http://final-countdown.pragmaticmates.com/demo/data-attributes.html

Requirements
------------
- jQuery http://jquery.com
- Kinetic http://kineticjs.com

Javascript Code
---------------
::

	$(document).ready(function() {
		$('.countdown').final_countdown({
			'start': 1362139200,
			'end': 1388461320,
			'now': 1387461319
		}, function() {
			// Finish Callback
		});
	});

HTML Template
-------------
::

	<div class="countdown countdown-container container">
	    <div class="clock row">
	        <div class="clock-item clock-days countdown-time-value col-sm-6 col-md-3">
	            <div class="wrap">
	                <div class="inner">
	                    <div id="canvas-days" class="clock-canvas"></div>

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
	                    <div id="canvas-hours" class="clock-canvas"></div>

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
	                    <div id="canvas-minutes" class="clock-canvas"></div>

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
	                    <div id="canvas-seconds" class="clock-canvas"></div>

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
        start: undefined,
        end: undefined,
        now: undefined,
        selectors: {
            value_seconds: '.clock-seconds .val',
            canvas_seconds: 'canvas-seconds',
            value_minutes: '.clock-minutes .val',
            canvas_minutes: 'canvas-minutes',
            value_hours: '.clock-hours .val',
            canvas_hours: 'canvas-hours',
            value_days: '.clock-days .val',
            canvas_days: 'canvas-days'
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

Data Attributes
----------------	
From version 1.1 you are able to use data attributes to define start, end and now settings for circles. Of course
border color is possible to define too. Quite handy when you want to define these attributes from CMS and you don't
want to post values into javascript.

Sample attributes for contdown container
::

        <div class="countdown countdown-container container"
             data-start="1362139200"
             data-end="1388461320"
             data-now="1387461319"
             data-border-color="rgba(255, 255, 255, .8)">

             REST OF HTML HERE

        </div>       