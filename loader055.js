var loaded = false;

let zoomVideo = document.getElementById("zoom-video").getElementsByTagName("video")[0];
let loopVideo = document.getElementById("loop-video").getElementsByTagName("video")[0];;

let zoomVideoFrame = document.getElementById("zoom-vid");
let loopVideoFrame = document.getElementById("loop-vid");

var disableVideo = false;

window.onload = (event) => {
  console.log("PAGE is loaded");
  loaded = true;
};

$( "#disable" ).click(function() {
  disableVideo = !disableVideo;
  console.log("DISABLE", disableVideo);
});

zoomVideo.setAttribute("playsinline", "true");
zoomVideo.setAttribute("muted", "true");
zoomVideo.muted = true;

zoomVideo.onended = (event) => {
    console.log("HERE")
    // loopVideoFrame.style.display = "block";
    zoomVideoFrame.style.display = "none";

    playVideo(loopVideo);
    $( "#top" ).animate({ opacity: 1 }, 1500);
};

async function playVideo(element) {
    try {
        await element.play();
    } catch (err) {
        console.log("error playing video", err);
    }
}

let loadingMessages = [
  "I can't remember a world before Nohio.",
  'I use CatNip for everything.',
  'It was the one silver lining in a dark and friendless void.',
  'I love the happy hour at the Nohio Milk bar.',
  'Milk is by far the best thing in Nohio.'
];

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

  // Pick a remaining element.
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;

  // And swap it with the current element.
  [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
  }

  return array;
}

function fadeOut() {
  $("#messenger").fadeOut(1500);
  setTimeout(fadeInButton, 1500);
}

function fadeInButton() {
    console.log("FADE IN");
    $(".enter_button").animate({ opacity: 1 }, 1500);
    $(".enter_button").addClass( "blinker" );
    $(".enter_button").click(function() {
      
      // play audio 
      track.muted = false;
      track.autoplay = true;
      track.play();
      controlBtn.className = "pause";
      circleAnimation.className = "circlePause";
      
      $( ".loading_container" ).animate({
    opacity: 0}, 2000, function() {
        
       if (window.innerWidth > 479 && disableVideo === false) {
          $( "#zoom-vid" ).show(
            function() {
              $( "#loop-vid" ).show();
            }
          );
          playVideo(zoomVideo);
       } else {
          // $( "#bg-image" ).show();
          $( "#zoom-vid" ).hide();
          $( "#top" ).animate({ opacity: 1 }, 1500);
       }
        
       $( ".loading_container" ).hide();

    
    });
  });

}

var Messenger = function(el, messages, stopMessages, cycleDelay){
  'use strict';
  var m = this;
  var lastMessage = false;
//   var secondTolastMessage = false;
  var initialMessageLimit = 1;

  m.init = function(){
  m.codeletters = "&#*+%?£@§$";
  m.message = 0;
  m.current_length = 0;
  m.fadeBuffer = false;
  m.messages = messages;
  setTimeout(m.animateIn, 100);
  };

  m.generateRandomString = function(length){
  var random_text = '';
  while(random_text.length < length){
    random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
  } 

    return random_text;
  };

  m.animateIn = function(){
  if(m.current_length < m.messages[m.message].length){
    m.current_length = m.current_length + 2;
    if(m.current_length > m.messages[m.message].length) {
      m.current_length = m.messages[m.message].length;
    }

    var message = m.generateRandomString(m.current_length);
    $(el).html(message);
    setTimeout(m.animateIn, 20);
  } else { 
    setTimeout(m.animateFadeBuffer, 20);
  }
  };

  m.animateFadeBuffer = function(){
  if(m.fadeBuffer === false){
    m.fadeBuffer = [];
    for(var i = 0; i < m.messages[m.message].length; i++){
      m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
    }
  }

  var do_cycles = false;
  var message = ''; 

  for(var i = 0; i < m.fadeBuffer.length; i++){
    var fader = m.fadeBuffer[i];
    if(fader.c > 0){
      do_cycles = true;
      fader.c--;
      message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
    } else {
      message += fader.l;
    }
  }

  $(el).html(message);

  if(do_cycles === true){
    setTimeout(m.animateFadeBuffer, 50);
  } else if (stopMessages == true && m.message >= initialMessageLimit && loaded === true) {
    m.messages = ['initialization complete...'];
    lastMessage = true;
    setTimeout(m.cycleText, cycleDelay);
  } else if (lastMessage === true) {
    setTimeout(fadeOut, 1000);
   } else {
    setTimeout(m.cycleText, cycleDelay);
  };
  };

  m.cycleText = function(){
  m.message = m.message + 1;

  // for testing
//   if (m.message >= initialMessageLimit) {
//      loaded = true;
//   };

  if(m.message >= m.messages.length){
      m.message = 0;
  }

  m.current_length = 0;
  m.fadeBuffer = false;
  $(el).html('');

  setTimeout(m.animateIn, 200);
  };

  m.init();     
}

var messenger = new Messenger($('#messenger'), shuffle(loadingMessages), true, 1500);
var messenger = new Messenger($('.copyright'), shuffle(loadingMessages).map((m, k) => {
  if (k % 2 === 0) {
    return "© 2022 CatBlox. All rights reserved."
  } else {
    return m
  }
 
}), false, 20000);


var track = document.getElementById('track');
var controlBtn = document.getElementById('play-pause');
var circleAnimation = document.getElementById('circle-animation');
var autoPlay = false;

function playPause() {
            if (track.paused) {
            		track.muted = false;
                track.autoplay = true;
                track.play();
                //controlBtn.textContent = "Pause";
                controlBtn.className = "pause";
                circleAnimation.className = "circlePause";
                //console.log("PAUSE");
            } else { 
                track.pause();
                 //controlBtn.textContent = "Play";
                controlBtn.className = "play";
                circleAnimation.className = "circlePlay";
                //console.log("PLAY");
            }
        }

        controlBtn.addEventListener("click", playPause);
        track.addEventListener("ended", function() {
          controlBtn.className = "play";
          circleAnimation.className = "circlePlay";
        });

