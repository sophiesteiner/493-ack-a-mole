$(function(){
  setTimeout(function(){
    $('#splash_screen').fadeOut();
  }, 3000);

  
  var audio = new Audio("images/Funny-background-music-for-games.mp3");

  $("#sound_toggle").click(function() {
    console.log("ON CLICK")
    if (audio.paused) {
      audio.play();
      $("#sound_toggle img").attr("src", "images/vol_on.png");
    } else {
      audio.pause();
      $("#sound_toggle img").attr("src", "images/vol_off.png");
    }
  });

  


}) 

function settings_open(){
  if($('.settings_panel').css("display") === "none"){
    $('.settings_panel').css("display", "flex");
  }
  else{
    $('.settings_panel').css("display", "none");
  }
  

}
/*
Vue.component('mole', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<img >'
  })

move_shovel () {

}
*/