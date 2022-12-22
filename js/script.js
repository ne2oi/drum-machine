"use strict";

//  on keydown
// function playSound(e) {
//   const audio = document.querySelector(`audio[data-pad="${e.keyCode}"]`);
//   const pad = document.querySelector(`.pad[data-pad="${e.keyCode}"]`);
//   if (!audio) return;
//   audio.currentTime = 0;
//   audio.play();
//   pad.classList.add("pad-active");
// }

// function removeTransition(e) {
//   if (e.propertyName !== "transform") return;
//   this.classList.remove("pad-active");
// }

// const pads = document.querySelectorAll(".pad");
// pads.forEach((pad) => pad.addEventListener("transitionend", removeTransition));
// window.addEventListener("keydown", playSound);

// on click
// function clickTransition(e) {
//   const audio = document.querySelector(
//     `audio[data-pad="${this.getAttribute("data-pad")}"]`
//   );
//   if (!audio) return;

//   audio.currentTime = 0;
//   audio.play();
//   this.classList.add("pad-active");
// }

// pads.forEach((pad) => pad.addEventListener("click", clickTransition));

//

function playSound(event) {
  const audio = document.querySelector(
    `audio[data-pad="${event.keyCode || this.getAttribute("data-pad")}"]`
  );
  const pad = document.querySelector(
    `.pad[data-pad="${event.keyCode || this.getAttribute("data-pad")}"]`
  );
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  pad.classList.add("pad-active");
}

function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("pad-active");
}

const pads = document.getElementsByClassName("pad");

window.addEventListener("keydown", playSound);

for (let pad of pads) {
  pad.addEventListener("transitionend", removeTransition);
  pad.addEventListener("click", playSound);
  pad.addEventListener("touchstart", playSound);
}

// const pads = document.querySelectorAll(".pad");
// pads.forEach((pad) => pad.addEventListener("transitionend", removeTransition));
// pads.forEach((pad) => pad.addEventListener("click", playSound));
// pads.forEach((pad) => pad.addEventListener("touchstart", playSound));

// massive banks
const sounds = [
  {
    name: "Bank 1",
    sounds: [
      {
        key: "81",
        file: "sounds/bank-1/kick.wav",
      },
      {
        key: "87",
        file: "sounds/bank-1/snare.wav",
      },
      {
        key: "69",
        file: "sounds/bank-1/hh.wav",
      },
      {
        key: "82",
        file: "sounds/bank-1/808.wav",
      },
    ],
  },
  {
    name: "Bank 2",
    sounds: [
      {
        key: "81",
        file: "sounds/bank-2/kick.wav",
      },
      {
        key: "87",
        file: "sounds/bank-2/snare.wav",
      },
      {
        key: "69",
        file: "sounds/bank-2/hh.wav",
      },
      {
        key: "82",
        file: "sounds/bank-2/808.wav",
      },
    ],
  },
  // Добавьте другие банки звуков сюда
];

//  add and switch banks
let currentBank = 0;

function nextBank() {
  currentBank++;
  if (currentBank >= sounds.length) {
    currentBank = 0;
  }
  loadBank();
}

function previousBank() {
  currentBank--;
  if (currentBank < 0) {
    currentBank = sounds.length - 1;
  }
  loadBank();
}

function loadBank() {
  const bank = sounds[currentBank];
  document.getElementById("bank-name").innerText = bank.name;

  const audioElements = document.querySelectorAll("audio");
  for (let i = 0; i < audioElements.length; i++) {
    const audioElement = audioElements[i];
    const sound = bank.sounds[i];
    if (!sound) {
      audioElement.style.display = "none";
      continue;
    }
    audioElement.style.display = "";
    audioElement.setAttribute("data-pad", sound.key);
    audioElement.src = sound.file;
  }
}

document.getElementById("next-bank").addEventListener("click", nextBank);
document
  .getElementById("previous-bank")
  .addEventListener("click", previousBank);
