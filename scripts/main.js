
$(document).ready(function () {
  // hide collapsible navbar after click
  $('.navbar-nav>li>a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
  });

  // Smooth scrolling
  var $scrollLink = $('.scroll');
  $scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top - 66
    }, 500 );
  });

  $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();
      $scrollLink.each(function() {
      var sectionOffset = $(this.hash).offset().top - 20;
        if ( sectionOffset <= scrollbarLocation ) {
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
      }
    });
  });

});
