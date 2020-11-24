// GLOBALS

//upload globals
let good_mole_fname = "images/good_mole.png";
let bad_mole_fname = "images/bad_mole.png";

//game globals
let good_or_bad;
let good_mole_counter = 0;
let bad_mole_counter = 0;
let mole_id = 0;
let time_before_mole_disappeares = 3600;
let good_mole_percentage_inverse = -1;

//settings globals
let current_difficulty = "easy";
// let settings_show = false;
let difficulty_dict = {
  "hard": "red",
  "medium": "yellow",
  "easy": "green"
};
let selected_color = "blue";
let time_remaining = 100;

//check if game is running
let playing = false;
let startedGame = false;
var startGame;
var countdownTimer;

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

  let timer = $(".countdown_timer span");
  let holes = document.querySelectorAll(".hole");
  let score = $(".score span");
  let points = 0;
  
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

  $("#begin_game").click(() => {
    //make note of time input
    time_remaining = document.getElementById("yay_time").value;
    // console.log("user gameplay length: ", time_remaining);
    timer.html(time_remaining);
    
    // fade settings out
    $('.settings_panel').fadeOut();
    
    //begin game
    // console.log("beginning gameplay...");
    startedGame = true;
    playing = true;

    if (current_difficulty === "hard") {
      time_before_mole_disappeares = 1000;
      good_mole_percentage_inverse = 3;
    } else if (current_difficulty === "medium") {
      time_before_mole_disappeares = 2400;
      good_mole_percentage_inverse = 4;
    }

    session();
  });

  $("#pause_play").click(function() {
    // console.log("clicked play/pause")
    if(startedGame == true && playing == true){
      // console.log("pausing gameplay...");   
      playing = false;
      clearInterval(startGame); 
      clearInterval(countdownTimer);
    }

    //if game has been started, paused, and now user wants to resume:
    else{
      // console.log("resuming gameplay...");
      playing = true;
      session();
    }
  });

  //GAMEPLAY SESSION STUFF
  function session(){
    //countdown time til end
    countdownTimer = setInterval(() => {
      --time_remaining;
      timer.html(time_remaining);
      
      //reset timer, points, show settings panel
      if(time_remaining == 0){
        clearInterval(startGame);        
        $('.settings_panel').fadeIn();
        points = 0;
        score.html(points);
        clearInterval(countdownTimer);
      }
    }, 1000);

    startGame = setInterval(() => {
    
      let image = document.createElement("img");

      mole_type_int = Math.floor(Math.random() * good_mole_percentage_inverse);
      mole_in_plane = false;
      if (mole_type_int === 0) {
        // console.log("making good mole");
        image.setAttribute("src", "images/good_mole.png");
        image.setAttribute("class", "good_mole");
      }
      else if (mole_type_int === 2) {
        mole_in_plane = true;
        image.setAttribute("src", "images/mole-in-plane.png");
        image.setAttribute("class", "flying_mole");
      } else {
        // console.log("making bad mole");
        image.setAttribute("src", "images/bad_mole.png");
        image.setAttribute("class", "bad_mole");
      }

      let my_mole_id = mole_id;
      image.setAttribute("id", "moleNum"+String(my_mole_id));
      mole_id += 1;
      
      time_to_wait = time_before_mole_disappeares;
      let div_to_add_mole_to;
      if (mole_in_plane) {
        div_to_add_mole_to = document.querySelectorAll("#flying_mole_div")[0];
        time_to_wait = 4500;
      } else {
        let random_number = Math.floor(Math.random() * 16);
        // console.log("adding image to hole", random_number)
        div_to_add_mole_to = holes[random_number];
      }
      div_to_add_mole_to.appendChild(image);

      setTimeout(() => {
        let child = document.getElementById("moleNum"+String(my_mole_id));
          if (child) {
            div_to_add_mole_to.removeChild(child);
            // console.log("deleted child", hole.childNodes)
          }
      }, time_to_wait); 
      
    }, 1600);


    window.addEventListener("click", (e) => {
      // console.log("target",e.target)
      let child = e.target;
      let childId = e.target.id;
      let parent = child.parentNode;
      
      if (childId.includes("moleNum")) {
        let pointsIncrementDisplay = document.createElement("div");
        if (child.classList.contains("good_mole")) {
          ++good_mole_counter;
          points -= 10
          score.html(points);
          
          pointsIncrementDisplay.innerHTML = "-10";
        } else if(child.classList.contains("bad_mole") || child.classList.contains("flying_mole")) {
          ++bad_mole_counter;
          points += 10
          score.html(points);
          pointsIncrementDisplay.innerHTML = "+10";
        }
        pointsIncrementDisplay.setAttribute("class", "pointsClass");
        if (child.classList.contains("flying_mole")) {
          pointsIncrementDisplay.setAttribute("class", "pointsClass flying_points");
          pointsIncrementDisplay.style.left = String(parseInt(window.getComputedStyle(child).left) + 40) + "px";
          pointsIncrementDisplay.style.top = String(parseInt(window.getComputedStyle(child).top) + 150) + "px";
          
        }
        parent.appendChild(pointsIncrementDisplay);

        setTimeout(() => {
          parent.removeChild(child)
        }, 100);
        setTimeout(() => {
          parent.removeChild(pointsIncrementDisplay);
        }, 1000);
      }
    });
  }
}) 

