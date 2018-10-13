
$(document).ready(function () {
  // hide collapsible navbar after click
  $('.navbar-nav > li > a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
  });

  // Smooth scrolling
  const $scrollLink = $('.scroll');
  $scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top - 66
    }, 500 );
  });

  $(window).scroll(function() {
    const scrollbarLocation = $(this).scrollTop();
      $scrollLink.each(function() {
      const sectionOffset = $(this.hash).offset().top - 20;
        if ( sectionOffset <= scrollbarLocation ) {
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
      }
    });
  });

});
