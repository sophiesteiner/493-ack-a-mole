// GLOBALS

//upload globals
let good_mole_fname = "images/good_mole.png";
let bad_mole_fname = "images/bad_mole.png";

//game globals
let good_or_bad;
let good_mole_counter = 0;
let bad_mole_counter = 0;

//settings globals
let current_difficulty = "easy";
// let settings_show = false;
let difficulty_dict = {
  "hard": "red",
  "medium": "yellow",
  "easy": "green"
};
let selected_color = "blue";

//check if game is running
let playing = false;

//splash screen
setTimeout(function(){
  $('#splash_screen').fadeOut();
  $('.settings_panel').fadeIn();

  //show selected difficulty button
  $('#'+current_difficulty).css('border-color',selected_color);
}, 3000);

// MAIN
$(document).ready( function(){
  $("#settings").click(() => {
    //show selected difficulty button
    $('#'+current_difficulty).css('border-color',selected_color);

    // if(settings_show === false){
    //   $('.settings_panel').fadeIn();
    //   settings_show = true;
    // }
    // else{
    //   $('.settings_panel').fadeOut();
    //   settings_show = false;
    // }
  });

  $("#begin_game").click(() => {
    // fade settings out
    $('.settings_panel').fadeOut();
  });
  
  $("#easy").click(() => {
    //reset old selected
    $('#'+current_difficulty).css('border-color',difficulty_dict[current_difficulty]);

    current_difficulty = "easy";

    //set new selected
    $('#'+current_difficulty).css('border-color',selected_color);

  });
  $("#medium").click(() => {
    //reset old selected
    $('#'+current_difficulty).css('border-color',difficulty_dict[current_difficulty]);

    current_difficulty = "medium";

    //set new selected
    $('#'+current_difficulty).css('border-color',selected_color);
  });
  $("#hard").click(() => {
    //reset old selected
    $('#'+current_difficulty).css('border-color',difficulty_dict[current_difficulty]);

    current_difficulty = "hard";

    //set new selected
    $('#'+current_difficulty).css('border-color',selected_color);
  });
  
  $('#good_img_in').click(() => {
    let good_file_obj = $('#good_file').prop('files')[0];
    if(good_file_obj){
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        $('#img1').attr('src', this.result);
      });

      reader.readAsDataURL(good_file_obj);
    }

    good_mole_fname = $('#good_file').prop('files')[0].name;
  });

  $('#bad_img_in').click(() => {
    let bad_file_obj = $('#bad_file').prop('files')[0];
    if(bad_file_obj){
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        $('#img2').attr('src', this.result);
      });

      reader.readAsDataURL(bad_file_obj);
    }
    
    bad_mole_fname = $('#bad_file').prop('files')[0].name;
  });

  let holes = document.querySelectorAll(".hole");
  let score = $(".score span");
  let points = 0;
  
  var audio = new Audio("images/Funny-background-music-for-games.mp3");

  $("#sound_toggle").click(function() {
    if (audio.paused) {
      audio.play();
      $("#sound_toggle img").attr("src", "images/vol_on.png");
    } else {
      audio.pause();
      $("#sound_toggle img").attr("src", "images/vol_off.png");
    }


  });

  $("#play_area").mousemove(function(e) {
    let y = e.pageY;
    let x = e.pageX;
    let width = $("#shovel").width();
    let height = $("#shovel").height();
    $("#shovel").css({top: y - height/2, left: x - width/3});
  }); 

  $("#play_area").mousedown(function() {
    $("#shovel").css('transform','rotate(-20deg)');
  }); 

  $("#play_area").mouseup(function() {
    $("#shovel").css('transform','rotate(20deg)');
  }); 

  $("#pause_play").click(function() {
    console.log("play")
    if(playing == false){
      playing = true;
      let time_before_mole_disappeares = 3600;
      let good_mole_percentage_inverse = -1;
      if (current_difficulty === "hard") {
        time_before_mole_disappeares = 1000;
        good_mole_percentage_inverse = 2;
      } else if (current_difficulty === "medium") {
        time_before_mole_disappeares = 2400;
        good_mole_percentage_inverse = 3;
      }

      //update timer somehow
      /*let countdownTimer = setInterval(() => {
        $("#time_left").html("4");
       }, 1000);*/

      var startGame = setInterval(() => {
        let random_number = Math.floor(Math.random() * 16);
        // console.log("adding image to hole", random_number)
        let hole = holes[random_number];
        let image = document.createElement("img");
  
        good_or_bad = Math.floor(Math.random() * good_mole_percentage_inverse);
        if (good_or_bad === 0) {
          // console.log("making good mole");
          image.setAttribute("src", "images/good_mole.png");
          image.setAttribute("class", "good_mole");
        }
        else {
          // console.log("making bad mole");
          image.setAttribute("src", "images/bad_mole.png");
          image.setAttribute("class", "bad_mole");
        }
        hole.appendChild(image);
        setTimeout(() => {
            // console.log("in timeout!", hole)
            if (hole.childNodes.length > 0) {
              console.log("we have a child!", hole.childNodes[0])
              hole.removeChild(hole.childNodes[0]);
              // console.log("deleted child", hole.childNodes)
            }
        }, time_before_mole_disappeares); 
        
      }, 1600);
  
  
      window.addEventListener("click", (e) => {
        console.log("target",e.target)
        if (e.target.children.length > 0) {
          if (good_or_bad === 0) {
            ++good_mole_counter;
            if (points > 0) {
            score.html(--points);
            }
            // console.log("Don't hit the good mole!")
          }
          else {
            ++bad_mole_counter;
            score.html(++points);
          }
          setTimeout(() => {
            // console.log(e.target.childNodes)
            e.target.removeChild(e.target.childNodes[0]);
          }, 100); 
        }
      }) 
    }
    //if game is currently in play
    else{
      console.log("pausing gameplay...");
      playing = true;      
      //clearInterval(startGame);
    }
  });
}) 

