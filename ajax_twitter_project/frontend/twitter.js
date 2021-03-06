const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./users_search");

$(() => {
  const buttons = $('button.follow-toggle');
  buttons.each((index, ele) => {
    new FollowToggle(ele);
  });

  const usersSearch =$('nav.users-search');
  usersSearch.each((index, ele) => {
    new UsersSearch(ele);
  });

  const tweetCompose =$('form.tweet-compose');
  tweetCompose.each((index, ele) => {
    new TweetCompose(ele);
  });
});