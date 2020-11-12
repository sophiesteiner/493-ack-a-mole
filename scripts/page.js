// GLOBALS
let current_difficulty = "easy";
let good_mole_fname = "images/good_mole.png";
let bad_mole_fname = "images/bad_mole.png";


// MAIN
$(function(){
  setTimeout(function(){
    $('#splash_screen').fadeOut();
  }, 3000);

  let holes = document.querySelectorAll(".hole");
  let score = $(".score span");
  let points = 0;
  
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

  $("#pause_play").click(function() {
    let hole;
    let startGame = setInterval(() => {
      let random_number = Math.floor(Math.random() * 16);
      hole = holes[random_number];
      let image = document.createElement("img");
      let good_or_bad = Math.floor(Math.random() * 2);
      if (good_or_bad === 0) {
        image.setAttribute("src", "images/good_mole.png");
        image.setAttribute("class", "good_mole");
      }
      else if (good_or_bad === 1) {
        image.setAttribute("src", "images/bad_mole.png");
        image.setAttribute("class", "bad_mole");
      }
      hole.appendChild(image);
      setTimeout(() => {
          hole.removeChild(image);
      }, 1200); 
      
    }, 1600);


    window.addEventListener("click", (e) => {
      if (e.target === hole) {
        score.html(++points);
      }
    }) 
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