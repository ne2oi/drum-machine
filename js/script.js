"use strict";

//  on keydown
function playSound(e) {
  const audio = document.querySelector(`audio[data-pad="${e.keyCode}"]`);
  const pad = document.querySelector(`.pad[data-pad="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  pad.classList.add("pad-active");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("pad-active");
}

const pads = document.querySelectorAll(".pad");
pads.forEach((pad) => pad.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

// on click
function clickTransition(e) {
  const audio = document.querySelector(
    `audio[data-pad="${this.getAttribute("data-pad")}"]`
  );
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  this.classList.add("pad-active");
}

pads.forEach((pad) => pad.addEventListener("click", clickTransition));
