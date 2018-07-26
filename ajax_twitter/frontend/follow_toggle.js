const APIUtil = require("./api_util");

class FollowToggle {
  constructor(el, options) {
    console.log(options);
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("init-follow-state") || options.followState;
    
    this.render();
    this.$el.on("click", (e) => this.handleClick(e));
  }
  
  render() {
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "followed"){
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "following"){
      this.$el.text("Following...");
      this.$el.prop("disabled", true);
    } else if (this.followState === "unfollowing"){
      this.$el.text("Unfollowing...");
      this.$el.prop("disabled", true);
    }
  }
  
  toggleFollow() {
    this.followState = (this.followState === "following") ? "followed" : "unfollowed";
    this.render();
  }
  
  handleClick(e) {
    e.preventDefault();
    if(this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(this.toggleFollow.bind(this));
    } else {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then(this.toggleFollow.bind(this));
    }
  }
}



module.exports = FollowToggle;