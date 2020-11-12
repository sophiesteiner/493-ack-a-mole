// GLOBALS
let current_difficulty = "easy";
let good_mole_fname = "images/good_mole.png";
let bad_mole_fname = "images/bad_mole.png";


// MAIN
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

// SETTINGS TIME

function settings_open(){
  if($('.settings_panel').css("display") === "none"){
    $('.settings_panel').css("display", "flex");
  }
  else{
    $('.settings_panel').css("display", "none");
  }
}

function set_easy(){
  current_difficulty = "easy";
}

function set_medium(){
  current_difficulty = "medium";
}

function set_hard(){
  current_difficulty = "hard";
}

function change_good_image(){
  // TODO
  good_mole_fname = "new";
}

function change_bad_image(){
  // TODO
  good_bad_fname = "new";
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