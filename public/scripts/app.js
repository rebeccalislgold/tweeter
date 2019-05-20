/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const urlTweets = '/tweets';

// Function to dynamically create HTML to display each existing tweet
function createTweetElement(tweetObj) {

  const $article = $('<article>')
    .addClass('tweet'); //fix this, because ID

  const $headerDiv = $('<div>')
    .addClass('tweet-header');

  const $h2Name = $('<h2>').text(tweetObj.user.name);

  const $pUser = $('<p>').text(tweetObj.user.handle)
    .addClass('tweeter-user');

  const $profilePic = $('<img>')
    .addClass('profile-pics')
    .attr('src', tweetObj.user.avatars.small);

  $h2Name.append($profilePic);

  $headerDiv.append($h2Name);

  $headerDiv.append($pUser);

  $article.append($headerDiv);

  const $pContent = $('<p>').text(tweetObj.content.text)
    .addClass('content');

  $article.append($pContent);

  const $footerDiv = $('<div>')
    .addClass('tweet-footer');

  const $postDate = tweetObj.created_at;
  const $age = $('<footer>').text(moment($postDate).fromNow());

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

// Function to loops through tweets, call createTweetElement function for each tweet, then take return value and appends it to the tweets container
function renderTweets(tweets) {

  for (const eachTweet of tweets) {
    const $articleTweet = createTweetElement(eachTweet);
    console.log($articleTweet);
    $('#tweets-container').prepend($articleTweet);
    console.log($('#tweets-container'));
  }
}


// Function to load tweets onto webpage
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

// This will run only when page DOM is "ready": load tweets and button functionality.
$(document).ready(function(){

  loadTweets(urlTweets, "all");
  const request = url => {
    $.ajax({
      method: 'POST',
      url: url,
      data: $('#form-submit').serialize(),
    })
      .done(response => {
        console.log('Done');
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


  // Creating and adding posts to page by selecting "Tweet" button
  $('#submit-tweet').on('click', function(event) {
    event.preventDefault();
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
      $('.counter').html(140);

    }

  })


  // Control visibility of New Tweet box with "Compose" button
  $('#compose-button').on('click', function(event) {

    if($(this).hasClass('active')){
        $(this).removeClass('active')
        $('#compose-button').css('color', 'black');
        $('.new-tweet').hide();

    } else {
        $(this).addClass('active')
        $('#compose-button').css('color', '#00a087');
        $('.new-tweet').slideToggle("fast");
        $('.new-tweet h5').hide();
        $('#form-submit textarea').focus();

    }

  })

})
