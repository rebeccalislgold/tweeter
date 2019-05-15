/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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

  for (const eachTweet of data) {
  const $articleTweet = createTweetElement(eachTweet);
  console.log($articleTweet);
  $('#tweets-container').append($articleTweet);
  console.log($('#tweets-container'));

  }

}


$(document).ready(function(){
  renderTweets(data);
})