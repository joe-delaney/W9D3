const APIUtil = require("./api_util");
class TweetCompose {
  constructor(el) {
    debugger;
    this.form = $(el);
    this.form.on("submit", submit);
  }

  submit(e) {
    e.preventDefault();
  }
}

module.exports = TweetCompose;