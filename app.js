const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const stopBtn = document.querySelector('.btn-stop');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;
let totalSeconds;
let savedSeconds;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if(state) {
    state = false;
    totalSeconds = savedSeconds || sessionAmount * 60;
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
}

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  savedSeconds = null;
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');
  
  // Reset to default 25:00
  minuteDiv.textContent = '25';
  secondDiv.textContent = '00';
  totalSeconds = 1500; // 25 minutes in seconds
}

const stopTimer = () => {
  clearInterval(myInterval);
  state = true;
  savedSeconds = totalSeconds;
}

const updateSeconds = () => {
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  totalSeconds--;

  let minutesLeft = Math.floor(totalSeconds/60);
  let secondsLeft = totalSeconds % 60;

  if(secondsLeft < 10) {
    secondDiv.textContent = '0' + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }
  minuteDiv.textContent = `${minutesLeft}`;

  if(minutesLeft === 0 && secondsLeft === 0) {
    bells.play();
    clearInterval(myInterval);
    state = true;
    savedSeconds = null;
  }
}

startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);