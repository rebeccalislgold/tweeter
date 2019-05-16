/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const urlTweets = '/tweets';

function createTweetElement(tweetObj) {

  const $article = $('<article>')
    .addClass('tweet'); //fix this, because ID

  const $headerDiv = $('<div>')
    .addClass('tweet-header');

  const $h2Name = $('<h2>').text(tweetObj.user.name);

  const $pUser = $('<p>').text(tweetObj.user.handle);

  const $profilePic = $('<img>')
    .addClass('profile-pics')
    .attr('src', tweetObj.user.avatars.small);

  $headerDiv.append($profilePic);

  $headerDiv.append($h2Name);

  $headerDiv.append($pUser);

  $article.append($headerDiv);

  const $pContent = $('<p>').text(tweetObj.content.text);

  $article.append($pContent);

  const $footerDiv = $('<div>')
    .addClass('tweet-footer');

  //update this to calculate age (today - created_at)
  const $age = $('<footer>').text(tweetObj.created_at);

  const $socialDiv = $('<div>')
    .addClass('social-links');

  const $flag = $('<i>')
    .addClass('fab fa-font-awesome-flag');

  const $retweet = $('<i>')
    .addClass('fas fa-retweet');

  const $heart = $('<i>')
    .addClass('fas fa-heart');

  $socialDiv.append($flag).append($retweet).append($heart);

  $footerDiv.append($age).append($socialDiv);

  $article.append($footerDiv);

  return $article;

}


function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const eachTweet of tweets) {
    const $articleTweet = createTweetElement(eachTweet);
    console.log($articleTweet);
    $('#tweets-container').prepend($articleTweet);
    console.log($('#tweets-container'));
  }
}

function loadTweets(url, loadAll) {
  $.ajax({
    method: 'GET',
    url: url,
  })
  .done(response => {
    if (loadAll === "all") {
      renderTweets(response);
    } else {
      const $articleTweet = createTweetElement(response.pop());
      $('#tweets-container').prepend($articleTweet);
    }
  })
  .fail(error => {
    console.log(`Error: ${error}`);
  });
};


$(document).ready(function(){
  loadTweets(urlTweets, "all");

  const request = url => {
    // Create Ajax request using JQuery

    // Set the options for the request
    $.ajax({
      method: 'POST',
      url: url,
      data: $('#form-submit').serialize(),
    })
      .done(response => {
        console.log('Done!');
        loadTweets(urlTweets, "some");
        $('form')[0].reset();

      })
      .fail(error => {

        console.log(`Error: ${error}`);

      })
      .always(() => {
        console.log('Request completed.');
      });
  };

  // renderTweets(urlTweets);

  $('#submit-tweet').on('click', function(event) {
    event.preventDefault();
    // Creating and adding posts to the page
    const inputLength = $('#form-submit textarea').val().length;

    if (inputLength > 140) {

      $('#over-char-limit').slideDown();
      $('#empty-tweet').hide();

    } else if (inputLength === 0) {

      $('#empty-tweet').slideDown();
      $('#over-char-limit').hide();

    } else {

      $('.new-tweet h5').hide();
      request('/tweets');

    }

  })

  $('#compose-button').on('click', function(event) {

    if($(this).hasClass('active')){
        $(this).removeClass('active')
        $('#compose-button').css('color', 'black');
        $('.new-tweet').hide();

    } else {
        $(this).addClass('active')
        $('#compose-button').css('color', '#00a087');
        $('.new-tweet').show();
        //HIDE H5 ERROR MSGS
        $('.new-tweet h5').hide();
        $('#form-submit textarea').focus();

    }

  })

})
