const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");

$( () => {
  $("button.follow-toggle").each((i, el) => new FollowToggle(el));
  $("nav.users-search").each((i, el) => new UsersSearch(el));
  $(".tweet-compose").each((i, el) => new TweetCompose(el));
});