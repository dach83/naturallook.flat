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
    //if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
      	var targetOffset = $target.offset().top;
        $('html,body').animate({scrollTop: targetOffset}, 500);//скорость прокрутки
        return false;
      }
    //}
  });


  // Закрытие модального окна
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $(".close-modal").click(function(event){
    event.preventDefault();

    $("body").removeClass("opened-modal");
    $(".overlay, .modal").fadeOut(0);

  });

  // Показ модального окна
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  $(".show-modal").click(function(event){
    event.preventDefault();

    var modalId = $(this).attr("href");
    console.log(modalId);
    $("body").addClass("opened-modal");
    $(".overlay, " + modalId).fadeIn(0);

  });

});