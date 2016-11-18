const bodyEl = document.body,
      container = document.querySelector(".container");
let isGetWild = false;

// Do you wanna get wild and tough.
const getWildAndTough = () => {
  const iframe = document.createElement("iframe");

  iframe.id = "getWildFrame";
  iframe.src = "//www.youtube.com/embed/LgBxze0ye94?rel=0&autoplay=1&loop=1&controls=0&wmode=transparent";
  iframe.frameborder = 0;
  iframe.allowfullscreen = true;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.className = "bg__movie";

  container.className += " is-wild";
  bodyEl.appendChild(iframe);
  bodyEl.focus();
}

// If you got wild
const gotWildAndTough = () => {
  const iframe = document.getElementById("getWildFrame");
  iframe.parentNode.removeChild(iframe);
  container.className = "container";
  bodyEl.focus();
}

// key control
let pressed = [];
const getWildCode = "71,69,84,87,73,76,68";

window.addEventListener("keydown", k => {
  pressed.push(k.keyCode);
  if(pressed.toString().indexOf(getWildCode) >= 0) {
    if(!isGetWild) {
      getWildAndTough();
      isGetWild = true;
    } else {
      gotWildAndTough();
      isGetWild = false;
    }
    pressed = [];
  }
}, true);

// after dark
window.addEventListener("devicelight", e => {
  const threshold = 10;
  const lux = e.value;
  if(lux < threshold) {
    if(!isGetWild) {
      getWildAndTough();
      isGetWild = true;
    }
  } else {
    gotWildAndTough();
    isGetWild = false;
  }
}, true);

// Web Speech API
if(window.SpeechRecognition || webkitSpeechRecognition) {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "ja";
  recognition.addEventListener("result", e => {
    const spokenWords = e.results.item(0).item(0).transcript;
    if(spokenWords === "get wild") {
      getWildAndTough();
    }
  }, false);
   
  recognition.start();
}
