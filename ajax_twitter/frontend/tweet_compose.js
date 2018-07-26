const APIUtil = require("./api_util");

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on("submit", (e) => this.submit(e));
  }
  
  submit(e) {
    e.preventDefault();
    console.log(e.currentTarget[1].value);
    const json = this.$el.serializeJSON();
    $(".tweet").prop("disabled", true);
    APIUtil.createTweet(json);
  }
}

module.exports = TweetCompose;