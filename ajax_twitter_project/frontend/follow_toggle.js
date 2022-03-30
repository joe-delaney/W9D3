class FollowToggle {
  constructor(el) {
    
    this.el = $(el);
    this.userId = el.dataset.userId;
    this.followState = el.dataset.initialFollowState;
    this.render();
    this.handleClick = this.handleClick.bind(this);
    // debugger;
    this.el.on("click", this.handleClick);
  }

  render(){
    if(this.followState === "false"){
      this.el.text("Follow!");
    }
    else{
      this.el.text("Unfollow!");
    }

  }

  handleClick(event){
    event.preventDefault();
    if(this.followState === "false"){
      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow`,
        dataType: "JSON"
      });
      this.followState = 'true';
    } else {
      $.ajax({
        method: "DELETE",
        url: `/users/${this.userId}/follow`,
        dataType: "JSON"
      });
      this.followState = 'false';
    }
    this.render();
  }
}

module.exports = FollowToggle;