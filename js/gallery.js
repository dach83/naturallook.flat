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

	

});