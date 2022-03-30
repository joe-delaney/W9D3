const FollowToggle = require("./follow_toggle");

$(() => {
  const buttons = $('button.follow-toggle');
  buttons.each((index, ele) => {
    new FollowToggle(ele);
    
  });
});