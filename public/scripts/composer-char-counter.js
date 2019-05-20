// Update the number of remaining characters as user types
$(document).ready(function() {

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