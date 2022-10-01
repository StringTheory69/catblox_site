
let messages = [
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
  $( ".enter_button" ).click(function() {
  $( "#loading_container" ).fadeOut( 2000, function() {
    $( "#loading_container" ).hide();
  }););

}

function blink_text() {
  /* $('.blink').fadeTo( 1000 , 0.25);
  $('.blink').fadeTo( 1000 , 1); */ 
}
  
setInterval(blink_text, 2000);

var Messenger = function(el){
'use strict';
var m = this;
var loaded = false;
var lastMessage = false;
var secondTolastMessage = false;
var initialMessageLimit = 1;

m.init = function(){
m.codeletters = "&#*+%?£@§$";
m.message = 0;
m.current_length = 0;
m.fadeBuffer = false;
m.messages = shuffle(messages);
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
} else if (lastMessage === true) {
    $(el).html('enter citizen<span class="blink">_</span>');
  $(el).css("cursor", "pointer");
  $(el).hover(function(){
    $(this).css("color", "rgba(208, 228, 225, 0.9");
    }, function(){
    $(this).css("color", "rgba(208, 228, 225, 0.7");
  }); 
    return;
} else if (m.message >= initialMessageLimit && loaded === true) {
    m.messages = ['initialization complete...', "enter citizen_"];
  secondTolastMessage = true;
  setTimeout(m.cycleText, 1500);
} else if (secondTolastMessage === true) {
    lastMessage = true;
    setTimeout(fadeOut, 1000);
    } else {
  setTimeout(m.cycleText, 1500);
};
};

m.cycleText = function(){
m.message = m.message + 1;

// for testing
if (m.message >= initialMessageLimit) {
   loaded = true;
};

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

var messenger = new Messenger($('#messenger'));

