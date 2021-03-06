$(function(){

	// Меняем высоту magicwall при изменении ширины
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	function ResizeMagicwall () {

		var mw = $('.magicwall');
		mw.each (function (){
			var $this = $(this);

			var availWidth  = $this.innerWidth();
			var availHeight = $this.parent().height() * 0.9;

			var colsCount = 2;
			var animation   = 'slideColumn,slideRow,-slideColumn,-slideRow';
			if (availWidth < 200) {
				colsCount = 1;
				animation = 'slideColumn,slideRow,-slideRow';
			}
				

			var imgWidth  = availWidth / colsCount;
			var imgHeight = 3/4 * imgWidth;

			var rowsCount = Math.floor (availHeight / imgHeight);

			/*
			console.log ('   availH=' + availHeight + 
				           '   availW=' + availWidth  + 
				           '   imgW='   + imgWidth    + 
				           '   imgH='   + imgHeight   + 
				           '  rowsCount=' + rowsCount + 
				           '  colsCount=' + colsCount);
			*/

			$this.magicWall('option', 'rowsCount',    rowsCount);
			$this.magicWall('option', 'columnsCount', colsCount);
			$this.magicWall('option', 'animations',   animation);
			$this.innerHeight (rowsCount*imgHeight);			

			$this.magicWall('update');

			//$this.innerHeight (7/2 * 3*$this.innerWidth()/4);
			//$this.innerWidth (4*$this.innerHeight()/3);	
		});

	};

	$(window).resize(ResizeMagicwall);
	//ResizeMagicwall ();


	// Инициализация magicwall
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	$(".magicwall").magicWall({
		//columnsCount: '2',
		//rowsCount: '7',
		paused: 'true',
		loadingMode: 'chain',
		preloadBeforeSwitch: 'true',
		pauseOnHover: 'item',
		//delay: '500',
		//duration: '800',
		thumbSizing: '95%',
		animations: 'slideColumn,slideRow,-slideColumn,-slideRow',
		fixedClass: 'fixed'
	});

	ResizeMagicwall ();

	
	// Запуск magicwall при наведении мышки на раздел
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

	$('section').hoverDelay({
		delayIn:  100,
		delayOut: 100,
		
		handlerIn: function($element){
			$('.magicwall').magicWall('stop');
			$element.find('.magicwall').magicWall('start');
		},

		handlerOut: function($element){
			$('.magicwall').magicWall('stop');
		}

	}); 



}); // ready