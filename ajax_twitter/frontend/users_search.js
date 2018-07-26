const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("input");
    this.$ul = this.$el.find('.users');
    
    this.$el.on("input", (e) => this.handleInput(e));
  }
  
  handleInput(e) {
    if (this.$input.val() === '') {
      this.renderResults([]);
      return;
    }
    
    APIUtil.searchUsers(this.$input.val())
      .then(users => this.renderResults(users));
  }
  
  renderResults(users) {
    this.$ul.empty();
    
    users.forEach(user => {
      const li = $("<li>");
      const a = $("<a>");
      a.prop("href", `/users/${user.id}`);
      a.text(`${user.username}`);
      li.append(a);
      const followState = user.followed ? "followed" : "unfollowed";
      const button = $("<button>");
      new FollowToggle(button, {userId: user.id, followState: followState});
      li.append(button);
      this.$ul.append(li);
    });
  }
}

module.exports = UsersSearch;
