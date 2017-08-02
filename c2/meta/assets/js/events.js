(function() {
	var hasTouchSupport = ('ontouchstart' in document.documentElement);
	if (hasTouchSupport) $('body').addClass('touchSupport');

	window.events = {
		start: hasTouchSupport ? 'touchstart' : 'mousedown',
		move: hasTouchSupport ? 'touchmove' : 'mousemove',
		end: hasTouchSupport ? 'touchend' : 'mouseup',
		pointerDown: false,
		deltaX: 0,
		deltaY: 0,
		distX: 0,
		distY: 0,
		numberOfTouches: 0
	};

	window.addEventListener(events.start, function(e) {
		events.pointerDown = true;
		events.originX = e.pageX;
		events.originY = e.pageY;
		events.originTime = new Date().getTime();
		events.deltaX = 0;
		events.deltaY = 0;
		events.distX = 0;
		events.distY = 0;

		var numberOfTouches;
		if (e.touches) numberOfTouches = e.touches.length;
		else if (e.originalEvent) numberOfTouches = e.originalEvent.touches;
		else numberOfTouches = 1;
		events.numberOfTouches = numberOfTouches;
	});

	window.addEventListener(events.end, function() {
		window.events.pointerDown = false;
		events.lastX = undefined;
		events.lastY = undefined;
		events.numberOfTouches = 1; // using this gross hack because 
	});

	window.addEventListener(events.move, function(e) {
		if (events.pointerDown) {
			events.deltaX = (e.pageX - events.lastX) || 0;
			events.deltaY = (e.pageY - events.lastY) || 0;
			events.distX = e.pageX - events.originX;
			events.distY = e.pageY - events.originY;
			events.lastX = e.pageX;
			events.lastY = e.pageY;

			// console.log('client: ' + e.clientX + ' / delta: ' + events.deltaX + ' / distance' + events.distX);
		}
	});
})();
