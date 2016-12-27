$(function(){

  // Плавный скролл к началу страницы
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $(".goto-top").click(function(){
    $('html,body').animate({scrollTop: 0}, 500);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
      $('.goto-top').addClass("visible");
    } else {
      $('.goto-top').removeClass("visible");
    }
  });

  
  // Плавный скролл до якоря
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $('a[href*=#]').click(function(event) {
    event.preventDefault();

    if ($(this).hasClass("show-modal")){
      return;
    }

    var $target = $(this.hash);
    $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
    if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({scrollTop: targetOffset}, 500); //скорость прокрутки
        return false;
    }

  });



  // Показ модального окна
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $(".show-modal").click(function(event){
    event.preventDefault();

    var modalId = $(this).attr("href");
    //console.log(modalId);
    $("body").addClass("opened-modal");
    setTimeout(function(){
      $(".overlay," + modalId).addClass("active");
    }, 100);
    setTimeout(function(){
      $(".overlay," + modalId).addClass("visible");
    }, 500);
  });


  // Закрытие модального окна
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  function CloseModal(){
    $(".overlay, .modal").removeClass("visible");
    setTimeout(function(){
      $(".overlay, .modal").removeClass("active");
    }, 500);
    setTimeout(function(){
      $("body").removeClass("opened-modal");  
    }, 1000);
  };


  $(".close-modal").click(function(event){
    event.preventDefault();
    CloseModal();
  });


  // Кнопки Esc
  // закрываем модальное окно
  $(document).keydown(function(event) {
    if ($("body").hasClass("page-gallery")){
      return;
    }

    if (event.keyCode == 27) { 
      CloseModal();
    }
  });

  // Валидация формы
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $(document).on('submit', '.ajax_form', function() {
    var $this = $(this);
    var formValidated = true; 

    var name = $this.find('input[name="name"]');
    if (name.length && name.val().length < 2) {
      formValidated = false;
    }

    var phone = $this.find('input[name="phone"]');
    if (phone.length && phone.val().length < 4) {
      formValidated = false;
    }

    afValidated = formValidated;
  });


  // Форма отправлена - закрытие формы
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $(document).on('af_complete', function(event, response) {
    if (afValidated){
      CloseModal();
    }
  });

  

});