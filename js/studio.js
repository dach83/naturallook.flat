$(function(){

	// Меняем высоту magicwall при изменении ширины
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	function ResizeMagicwall () {

		var mw = $('.magicwall');
		mw.each (function (){
			var $this = $(this);
			$this.innerHeight (3*$this.innerWidth()/4);
		});

	};

	$(window).resize(ResizeMagicwall);
	ResizeMagicwall ();


	// Запуск magicwall
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	$(".desktop .magicwall").magicWall({
		columnsCount: '5',
		rowsCount: '5',
		//paused: 'true',
		//loadingMode: 'chain',
		preloadBeforeSwitch: 'true',
		thumbSizing: '95%',
		fixedClass: 'fixed'
	});

	$(".tablet .magicwall").magicWall({
		columnsCount: '3',
		rowsCount: '3',
		//paused: 'true',
		//loadingMode: 'chain',
		preloadBeforeSwitch: 'true',
		thumbSizing: '95%',
		fixedClass: 'fixed'
	});


	// Плавный скролл к секции с ценами
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	$("#js-scrollTo-prices").click (function(event){
		event.preventDefault();
		var offset = $("#js-prices").offset().top;
		$("html, body").animate ({
			scrollTop: offset
		}, 800);

	});


});