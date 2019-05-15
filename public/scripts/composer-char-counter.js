$(document).ready(function() {
  // --- our code goes here ---
  $('.new-tweet form textarea').on("input", function() {

    const charsLeft = 140 - this.value.length;
    $(this).parent().find('.counter').text(charsLeft);

    if (charsLeft < 0) {

      $('.counter').css('color', 'red')

    } else if (charsLeft >= 0) {

      $('.counter').css('color', '#244751')

    }

  });
});