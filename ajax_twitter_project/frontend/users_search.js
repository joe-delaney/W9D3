const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");
class UsersSearch {
  constructor(el) {
    this.el = $(el);
    this.input = this.el.find("input");
    this.ul = this.el.find(".users");
    this.handleInput = this.handleInput.bind(this);
    this.el.on("input", this.handleInput);
  }
  handleInput(e){
    // debugger;
    const value = this.input.val();
    APIUtil.searchUsers(value)
    .then( (results) => {this.renderResults(results);})
    .fail(() =>{console.log("FAILLL");});
    
  }

  renderResults(results) {
    this.ul.empty();
    for(let i = 0; i < results.length; i++) {
      const $li = $(`<li>
                    <a href="/users/${results[i].id}">${results[i].username}</a>
                    </li>`);
      const $button = $(`<button class="follow-toggle"></button>`);
      new FollowToggle($button, results[i]);
      $li.append($button);
      this.ul.append($li);
    }
  }
}

module.exports = UsersSearch;