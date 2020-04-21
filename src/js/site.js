/* global $ */

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()+30) {
      //$('header').fadeIn(500);
      $('.page, header').addClass('fixed');
    } else {
      //$('header').fadeOut(500);
      $('.page, header').removeClass('fixed');
    }
  });

  $('a.soft-scroll').click((event) => {
    $('body,html').animate({
      scrollTop: $($(event.currentTarget).attr('href')).offset().top - 50,
    }, 600);
    return false;
  });

  $(window).scroll(function (event) {
      $('.animate').each(function(i, el) {
        var el = $(el);
        var classes = '';
    
        if(el.hasClass('fade')) classes = 'a-fade';

        if(el.hasClass('slide-right')) classes = 'a-slide a-slide-right';
        if(el.hasClass('slide-left')) classes = 'a-slide a-slide-left';
        if(el.hasClass('slide-up')) classes = 'a-slide a-slide-up';
        if(el.hasClass('slide-down')) classes = 'a-slide a-slide-down';

        if (el.visible(true)) {
          el.addClass(classes);
        } 
      });
      
    });

  $('#contact form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      data: $(this).serialize(),
      dataType: 'json',
      type: 'POST',
      url: $(this).attr('action')
    }).done( function(data) {
      if(!data.error) {
        $('#contact form *:visible').hide();
        $('#contact form h3').fadeIn();
      } else {
        console.log(data);
      }
    });
  });
  return false;
});