function distance(offsetA, offsetB) {
	var aLeft = offsetA.offset().left;
	var aTop = offsetA.offset().top;
	var aBottom = offsetA.outerHeight();
	var aRight = offsetA.outerWidth();


	var bLeft = offsetB.offset().left;
	var bRight = offsetB.outerWidth();
	var bTop = offsetB.offset().top;
	var bBottom = offsetB.outerHeight();

	var collisionObjectA = [{ left: aLeft, right: aRight, top: aTop, bottom: aBottom }]

	var collisionObjectB = [{ left: bLeft, right: bRight, top: bTop, bottom: bBottom }]

	var collisionEdgesTopBottomA = collisionObjectA.top + collisionObjectA.bottom;
	var collisionEdgesLeftRightA = collisionObjectA.left + collisionObjectA.right;

	var collisionEdgesTopBottomB = collisionObjectB.top + collisionObjectB.bottom;
	var collisionEdgesLeftRightB = collisionObjectB.left + collisionObjectB.right;
	var collision = false
	console.log('collisionObjects', collisionObjectA, ':', collisionObjectB, collision);
	if (collisionObjectA.right > collisionObjectB.left && collisionObjectA.left < collisionObjectB.right && collisionObjectA.top < collisionObjectB.bottom && collisionObjectA.bottom > collisionObjectB.top) {
		console.log('something hits');
		return true;
	} else {
		console.log('something misses',);
	return false;
	}
}
$(function () {
	var $window = $(window),
		$body = $('body');

	var appWidth = $window.width(),
		appHeight = $window.height();
	var $ship = $('#ship')
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	moveWallRandom()

	function moveWallRandom() {
		_.times(1, function () {
			var limitTopRand = appHeight - getRandomInt(80, (appHeight - 60))
			var limitLeftRand = appWidth - getRandomInt(10, (appWidth / 2))
			console.log('limitTop:', limitTopRand, 'limitLeft:', limitLeftRand, 'appSize', `${appHeight}:${appWidth}`);
			var $wall = $("<div>").addClass('wall').appendTo($body);
			$wall
				.animate({
					top: `${limitTopRand}px`,
					left: `${limitLeftRand}px`,
				})
			// .show()
		})
	}

	// Move Ship U-D-L-R
	$(document).keydown(function (event) {
		var offsetShip = $ship.offset()
		switch (event.which) {
			case 38: //up
				$ship
					.animate({
						top: "-=2%"
					})
				break;
			case 37: //left
				$ship
					.animate({
						left: "-=2%"
					})
				break;
			case 39: //right
				$ship
					.animate({
						left: "+=2%"
					})
				break;
			case 40: //down
				$ship
					.animate({
						top: "+=2%"
					})
				break;
			case 32: //space
				// shoot
				console.log('pew pew');
				var $bullet = $("<div>").addClass('bullet').appendTo($body);
				console.log('offset:', offsetShip);
				$bullet
					.hide()
					.offset({
						top: offsetShip.top,
						left: offsetShip.left
					})
					.stop()
					.show()
					.animate({
						left: "98%"
					}, {
						duration: 5000,
						progress: function () {
							//check for walls
							var offset = $bullet.offset();
							$('.wall').each((index, wall) => {
								var $wall = $(wall);
								var $bullet = $('.bullet')
								console.log(distance($bullet, $wall));
							})
						},
						complete: function () {
							$bullet.remove()
						}
					})
				break;
		}
	});
});