const APIUtil = {
  followUser: id => $.ajax({
    type: "POST",
    url: `/users/${id}/follow`,
    dataType: "json"
  }),

  unfollowUser: id => $.ajax({
    type: "DELETE",
    url: `/users/${id}/follow`,
    dataType: "json"
  }),
  
  searchUsers: queryVal => $.ajax({
    type: "GET",
    url: "/users/search",
    dataType: "json",
    data: { query: queryVal }
  }),
  
  createTweet: data => $.ajax({
    type: "POST",
    url: "/tweets",
    dataType: "json",
    data
  })
};

module.exports = APIUtil;