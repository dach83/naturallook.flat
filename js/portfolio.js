$(function(){

	// Меняем высоту magicwall при изменении ширины
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	function ResizeMagicwall () {

		var mw = $('.magicwall');
		mw.each (function (){
			var $this = $(this);
			$this.innerHeight (7*3*$this.innerWidth()/4);
			//$this.innerWidth (4*$this.innerHeight()/3);	
		});

	};

	$(window).resize(ResizeMagicwall);
	ResizeMagicwall ();


	// Запуск magicwall
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	$(".magicwall").magicWall({
		columnsCount: '1',
		rowsCount: '7',
		//paused: 'true',
		//loadingMode: 'chain',
		//preloadBeforeSwitch: 'true',
		delay: '0',
		duration: '3000',
		thumbSizing: '95%',
		animations: 'slideColumn',
		fixedClass: 'fixed'
	});

	

});