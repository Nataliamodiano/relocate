$('a[href*="#"]:not([href="#"])').click(function() {
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
         || location.hostname == this.hostname) {
 
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                  scrollTop: target.offset().top
             }, 1000);
             return false;
         }
     }
 });

$(window).scroll(function() {
 if ($(this).scrollTop() < 350){  
    $('input').removeClass("sticky");
    $('form').removeClass("nav");
    $('form').addClass("input-group");
  }
  if ($(this).scrollTop() > 350){  
    $('input').addClass("sticky");
    $('form').removeClass("input-group");
    $('form').addClass("nav");
  } 
});