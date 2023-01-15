let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength =document.getElementById('session-length');
let timeLeft = document.getElementById('time-left')

let timer;
let timerStatus = "begin";
let breakStatus = "false";


function startStop(){
  
  if (timerStatus === "begin" || timerStatus === "stopped"){
    timerStatus = "counting"; 
    timer = setInterval(() => {
      timeLeft.innerText = decrementTime(timeLeft.innerText);
      if(timeLeft.innerText === "0-1:59"){clearInterval(timer);
                                       playAudio();
                                       timerStatus = "stopped";
                                       timeLeft.innerText = updateTime();
                                       startStop();
                                       }
                              }, 1000)
    
    
  }else if(timerStatus === "counting"){
    timerStatus = "stopped"
    clearInterval(timer);
  }
}
                        
                        
function reset(){ 
  timeLeft.innerText = "25:00";
  sessionLength.innerText = "25";
  breakLength.innerText = "5";
  timerStatus = "begin";
  pauseAudio();
  rewindAudio();
  breakStatus = "false";
  document.getElementById('timer-label').innerText = "Session";
  clearInterval(timer);
}

function decrementTime(timeString) {
   let timeDisplay = timeString.split(":");
   let minuteDisplay = parseInt(timeDisplay[0]);
   let secondDisplay = parseInt(timeDisplay[1]);
  
      secondDisplay -= 1;
  
   if (secondDisplay === -1){
      secondDisplay = 59;
      minuteDisplay -= 1;
   };
  
  if (secondDisplay <= 9){
    secondDisplay = "0" + secondDisplay;
  };
  
  if(minuteDisplay <= 9){
    minuteDisplay = "0" + minuteDisplay;
  }
  
  return minuteDisplay + ":" + secondDisplay;                                   
};

function updateTime(){
  if(breakStatus === "false"){
    if(parseFloat(breakLength.innerText) < 10) {
      breakStatus = "true";
      document.getElementById('timer-label').innerText = "Break";
      return "0" + document.getElementById('break-length').innerText + ":" + "00";
    }else {
      breakStatus = "true";
      document.getElementById('timer-label').innerText = "Break";
      return + document.getElementById('break-length').innerText + ":" + "00";
    }
  }else if(breakStatus === "true"){
    if(parseFloat(sessionLength.innerText) < 10){
      breakStatus = "false";
      document.getElementById('timer-label').innerText = "Session";
      return "0" +document.getElementById('session-length').innerText + ":" + "00";
    }else {
    breakStatus = "false";
    document.getElementById('timer-label').innerText = "Session";
    return document.getElementById('session-length').innerText + ":" + "00";
    }
  }
  
};


  function incOrDec(input) {
  if(input === "decrease-session" && parseFloat(sessionLength.innerHTML) > 1){
    if(parseFloat(sessionLength.innerText) <= 10){
      sessionLength.innerHTML = parseInt(sessionLength.innerHTML) - 1;
      timeLeft.innerText = "0" + sessionLength.innerText + ":" + "00";
    }else{
    sessionLength.innerHTML = parseInt(sessionLength.innerHTML) - 1;
    timeLeft.innerText = sessionLength.innerText + ":" + "00";
    }
  }else if(input === "increase-session" && sessionLength.innerHTML != "60"){
    sessionLength.innerHTML = parseInt(sessionLength.innerHTML) + 1;
    timeLeft.innerText = sessionLength.innerText + ":" + "00";
  }else if (input === "decrease-break" && parseFloat(breakLength.innerHTML) > 1){
    breakLength.innerHTML = parseInt(breakLength.innerHTML) - 1;
  }else if(input === "increase-break" && breakLength.innerHTML != "60"){
    breakLength.innerHTML = parseInt(breakLength.innerHTML) + 1;
  }
  };

function playAudio() {
  let x = document.getElementById("beep");
  x.play();
}

function pauseAudio(){
  let x = document.getElementById("beep");
  x.pause();
}
function rewindAudio(){
  let x = document.getElementById("beep");
  x.currentTime = 0
};