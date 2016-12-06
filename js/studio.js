$(function(){

	$(".magicwall.desktop").magicWall({
		columnsCount: '5',
		rowsCount: '5',
		//paused: 'true',
		//loadingMode: 'chain',
		//preloadBeforeSwitch: 'true',
		fixedClass: 'fixed'
	});

	$(".magicwall.tablet").magicWall({
		columnsCount: '2',
		rowsCount: '7',
		//paused: 'true',
		//loadingMode: 'chain',
		//preloadBeforeSwitch: 'true',
		fixedClass: 'fixed'
	});

});