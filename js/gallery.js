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


	// Запрещаем выделение элементов
	$(document).on("mousedown", function (event){
		event.preventDefault();
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
			var container = handle.parent(".slide");
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



	// Слайдер
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	



	function MinThumbsLeft (){
		var thumbs = $('.thumbs');

		//var lastThumb  = thumbs.find("li").last();
		//return (thumbs.outerWidth(true) - 1.1* lastThumb.outerWidth(true)) / 2 -  lastThumb.position().left;

		return -10+thumbs.innerWidth()-thumbs.find("ul").outerWidth(true);
	}


	function MaxThumbsLeft (){
		var thumbs = $('.thumbs');
		
		//var firstThumb = thumbs.find("li").first();
		//return (thumbs.outerWidth(true) - 1.1*firstThumb.outerWidth(true)) / 2 - firstThumb.position().left;

		return 10;
	}

	// Сдвиг ленты миниатюр по горизонтали
	function SetThumbsLeft (newLeft){
		
		var thumbs = $('.thumbs');
		
		// список короткий и весь влазит на экран
		// не меняем его положение
		if (thumbs.find("ul").outerWidth(true) < thumbs.innerWidth()) {
			return;
		}

		var minLeft = MinThumbsLeft();
		var maxLeft = MaxThumbsLeft();

		if (newLeft < minLeft) {
			newLeft = minLeft;
		} else if (newLeft > maxLeft) {
			newLeft = maxLeft;
		}

		thumbs.find("ul").stop(true).animate({left: newLeft}, 500);
	};


	// Показ слйда с заданным идентификатором
	var changeSlideTimeout = false;
	function ShowSlideById (slideId){
		
		// еще не полносью мсменился предыдущий слайд
		if (changeSlideTimeout){
			return;
		}

		var slider = $(".slider");
		var thumbs = $(".thumbs");
		var slideList = slider.find("li");
		var thumbList = thumbs.find("li");

		// выбор слайда
		var slide = slider.find("li[data-slide-id="+ slideId + "]");
		if (!slide.length) {
			slide   = slideList.first();
			slideId = slide.attr("data-slide-id");
		}

		if (!slide.hasClass("active")) {
			slideList.removeClass("active");
			slide.find(".curtain").removeAttr('style'); 
			slide.find(".handle" ).removeAttr('style');
			slide.addClass("active");
		}	


		// счетчик слайдов
		var counterStr = slideList.index(slide) + 1 + "/" + 
		                 slideList.length;
		$(".slide-counter").text(counterStr);


		// выбор миниатюры
		var thumb = thumbs.find("li[data-slide-id="+ slideId + "]");
		if (thumb.length){
			thumbList.removeClass("active");
			thumb.addClass("active");

			var offset = (thumbs.outerWidth(true) - 1.1*thumb.outerWidth(true)) / 2 - thumb.position().left;
			SetThumbsLeft (offset); // сдвиг ленты миниатюр
		}

		// сделаем задержку перед включением следующего слайда
		changeSlideTimeout = true;
		setTimeout (function(){
			changeSlideTimeout = false;
		}, 100);

	};


	// Показ активного слайда
	ShowActiveSlide ();
	function ShowActiveSlide (){
		var slideId = $(".slider li.active").attr("data-slide-id");
		ShowSlideById (slideId);
	}; 


	// Показ предыдущего слайда
	function ShowPrevSlide (event){
		event.preventDefault();

		var prev = $(".slider li.active").prev();
		if (!prev.length) {
			prev = $(".slider li").last();
		}

		ShowSlideById(prev.attr("data-slide-id"));
	};


	// Показ следующего слайда
	function ShowNextSlide (event){
		event.preventDefault();

		var next = $(".slider li.active").next();
		if (!next.length) {
			next = $(".slider li").first();
		}

		ShowSlideById (next.attr("data-slide-id"));
	};


	// щелкнули по кнопке вперед/назад
	$("#js-prev-slide").click(ShowPrevSlide);
	$("#js-next-slide").click(ShowNextSlide);


	// Кнопки влево/вправо
	// показываем предыдущую/следующую работу
	$(document).keydown(function(event) {
		if (event.keyCode == 37) { 
			ShowPrevSlide (event);	
		}
		if (event.keyCode == 39) { 
			ShowNextSlide (event);	
		}
	});


	// Wheel на слайдере
	// показываем предыдущую/следующую работу
	function WheelOnSlider (event, delta){
		event.preventDefault();
		if (delta < 0) {
			ShowNextSlide (event);	
		} else if (delta > 0) {
			ShowPrevSlide (event);	
		};
	}


	// Wheel на слайдере
	// показываем предыдущую/следующую работу
	$(".slider").mousewheel(WheelOnSlider);


	// Wheel на миниатюрах
	// прокручиваем ленту миниатюр
	var currThumbLeft = 0;
	$(".thumbs").mousewheel(function (event, delta) {
		event.preventDefault();

		// список короткий и весь влазит на экран
		// просто листаем слайды, не меняя положение списка
		var thumbs = $(this);
		if (thumbs.find("ul").outerWidth(true) < thumbs.innerWidth()) {
			WheelOnSlider(event, delta);
			return;
		}

		// запомним текущее положение
		var prevThumbLeft = currThumbLeft;
		if (delta < 0) {
			currThumbLeft -= 100;
		} else if (delta > 0) {
			currThumbLeft += 100;	
		};

		// ограничиваем перемещение блока миниатюр
		var minLeft = MinThumbsLeft();
		var maxLeft = MaxThumbsLeft();
		if (currThumbLeft <= minLeft) {
			currThumbLeft = minLeft;
		} else if (currThumbLeft >= maxLeft) {
			currThumbLeft = maxLeft;
		}

		// если положение не изменилось,
		// то ничего не делаем
		if (prevThumbLeft == currThumbLeft){
			return;
		}

		// смещаем миниатюры
		SetThumbsLeft (currThumbLeft);
	});



	// Щелчек по миниатюре
	$(".thumbs li").click(function (event){
		event.preventDefault();

		var slideId = $(this).attr("data-slide-id");
		ShowSlideById (slideId);
	});


	// при изменении размеров окна
	// надо заново спозиционировать элементы
	$(window).resize(function(){
		$(".thumbs ul").removeAttr("style");
		ShowActiveSlide ();
	});


	// щелчек на кнопке закрыть
	// если история не пустая, то возвращаемся назад
	// если пустая, то переходим на страницу портфолио
	$("#js-close-gallery").click(function(){

		if (history.length == 1) {
			window.location.href = "portfolio.html"; 
		} else {
			history.back();
		}

	});

}); // ready