$(function(){


	// Шторка ДО-ПОСЛЕ
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	var downHandleX = 0; 
	    downMouseX  = 0;

	// Заканчиваю движение шторки ДО-ПОСЛЕ
	$(document).on("mouseup", function (){
		$(".handle").removeClass ("drag-handle");
		downHandleX = 0;
		downMouseX  = 0;
	});


	// Начинаю движение шторки ДО-ПОСЛЕ
	$(".handle").on("mousedown", function (event){
		event.preventDefault();

		var $this = $(this);
		$this.addClass ("drag-handle");
		downHandleX = $this.position().left;
		downMouseX  = event.pageX;
	});


	// Обработка перетаскивания шторки ДО-ПОСЛЕ
	$(document).on("mousemove", function (event){
		var handle = $(".drag-handle");
		if (handle.length){
			var container = handle.parent(".before-after");
			var curtain   = container.find(".curtain");

			// вычисляю новую позицию в процентах
			var newHandleX = downHandleX + (event.pageX-downMouseX);
			var newPos = 100*newHandleX/container.width();
			if (newPos < 0){
				newPos = 0;
			} else if (newPos > 100) {
				newPos = 100;
			}

			// сдвигаю шторку
			handle.css('left', newPos + '%');
			curtain.css('width', newPos + '%');	
		} // if (handle.length)
	});



	// Переключение слайдов
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	
	function ShowThisSlide (slide){
		$(".slider li").removeClass("active");
		slide.addClass("active");
		slide.find(".curtain").removeAttr('style');
		slide.find(".handle").removeAttr('style');
		
		/*
		setTimeout(function (){
			slide.find(".curtain").fadeIn(1000);
			slide.find(".handle").fadeIn(1000);
		}, 500);
		*/
	};


	// Показ предыдущего слайда
	function ShowPrevSlide (event){
		event.preventDefault();

		var prev = $(".slider li.active").prev();
		if (!prev.length) {
			prev = $(".slider li").last();
		}

		//prev.find(".curtain").fadeOut(50);
		//prev.find(".handle").fadeOut(50);
		ShowThisSlide(prev);
	};


	// Показ следующего слайда
	function ShowNextSlide (event){
		event.preventDefault();

		var next = $(".slider li.active").next();
		if (!next.length) {
			next = $(".slider li").first();
		}

		//next.find(".curtain").fadeOut(50);
		//next.find(".handle").fadeOut(50);
		ShowThisSlide (next);
	};


	// щелкнули по кнопке вперед/назад
	$("#js-prev-slide").click(ShowPrevSlide);
	$("#js-next-slide").click(ShowNextSlide);


	// Кнопки влево/вправо
	// показываем предыдущую/следующую работу
	$(document).keydown(function(event) {
		console.log("keydown");

		if (event.keyCode == 37) { 
			ShowPrevSlide (event);	
		}
		if (event.keyCode == 39) { 
			ShowNextSlide (event);	
		}
	});


	// Wheel на слайдере
	// показываем предыдущую/следующую работу
	$(".slider").mousewheel(function (event, delta) {
		if (delta < 0) {
			ShowNextSlide (event);	
		} else if (delta > 0) {
			ShowPrevSlide (event);	
		};

		return false;
	});



});