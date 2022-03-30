const APIUtil = require("./api_util");

class FollowToggle {
  constructor(el, options) {
    this.el = $(el);
    this.userId = this.el.data("userId") || options.id;
    this.followState =  this.el.data("initialFollowState")
    if(this.followState === undefined) this.followState = options.followed;
    this.render();
    this.el.prop("disabled", false);
    this.handleClick = this.handleClick.bind(this);
    this.el.on("click", this.handleClick);
  
  }

  render(){
    if(this.followState === false){
      this.el.text("Follow!");
    }
    else{
      this.el.text("Unfollow!");
    }
    this.el.prop("disabled", false);
  }

  handleClick(event){
    this.el.prop("disabled", true); 
    if(this.followState === false){
      APIUtil.followUser(this.userId)
      .then(() => {
        this.followState = true;
        this.render();
      });
    } else {
      APIUtil.unfollowUser(this.userId)
      .then(() => {
        this.followState = false;
        this.render();
      });
    }
    
  }
}

module.exports = FollowToggle;