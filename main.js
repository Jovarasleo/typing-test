import keyCodes from "./data/keyCodes";
import words from "./data/data";

import loadData from "./util/loadData";
import offloadData from "./util/offloadData";
import shuffleArray from "./util/shuffleArray";
import getCaretPosition from "./util/getCaretPosition";
import timer from "./util/timer";

import backdrop from "./component/backdrop";
import "./style.css";

const selectInput = document.querySelector(".input");
const selectApp = document.querySelector("#app");

const wordsContainer = document.querySelector(".upcomingWords");
const writtenWordsContainer = document.querySelector(".writtenWords");

const selectWordsCounter = document.querySelector(".card--wordCounter");
const selectCharCounter = document.querySelector(".card--charCounter");
const selectAccCounter = document.querySelector(".card--accuracyCountery");
const selectTimer = document.querySelector(".card--timer");

const defaultTime = 60;
let shuffled = shuffleArray(words);
let wordIndex = 0;
let charIndex = 0;
let input = "";
let dataArray = [];
let writtenDataArray = [];
let accuracy;
let wordsCounter = 0;
let charCounter = 0;
let startTimer = true;
let currentWord = shuffled[wordIndex];

function reset() {
  charIndex = 0;
  shuffled = shuffleArray(words);
  input = "";
  wordsCounter = 0;
  charCounter = 0;
  wordIndex = 0;
  startTimer = true;
  dataArray = [];
  writtenDataArray = [];

  selectTimer.textContent = defaultTime;
  selectAccCounter.textContent = 0;
  selectInput.textContent = "";
  selectCharCounter.textContent = charCounter;
  selectWordsCounter.textContent = wordsCounter;
  wordsContainer.innerHTML = "";
  loadData(wordsContainer, wordIndex, shuffled);
  currentWord = shuffled[wordIndex];
  wordsContainer.firstChild.textContent = currentWord;
  offloadData(writtenWordsContainer, dataArray, writtenDataArray);
}

selectInput.addEventListener("keydown", (e) => {
  console.log(e);
  if (startTimer) {
    startTimer = false;
    timer(defaultTime, () =>
      backdrop(reset, wordsCounter, charCounter, accuracy)
    ).start();
  }

  if (timer().interval !== 0) {
    let position = getCaretPosition(e.target);
    if (e.keyCode === 32 || e.keyCode === 13) {
      console.log(input);
      e.preventDefault();
      dataArray.push(currentWord);
      charIndex = 0;
      if (input.length) {
        writtenDataArray.push(input);
      }
      if (selectInput.textContent) {
        wordIndex++;
        if (selectInput.textContent === currentWord) {
          charCounter += input.length;
          selectCharCounter.textContent = charCounter;
          wordsCounter++;
          selectWordsCounter.textContent = wordsCounter;
        }
        accuracy = Math.round((wordsCounter / wordIndex) * 100);
        selectAccCounter.textContent = accuracy;
        offloadData(writtenWordsContainer, dataArray, writtenDataArray);
        wordsContainer.innerHTML = "";
        loadData(wordsContainer, wordIndex, shuffled);
        selectInput.textContent = "";
      }
      input = "";
      currentWord = shuffled[wordIndex];
    }
    if (e.keyCode === 8 && charIndex >= 1 && position > 0) {
      input = input.slice(0, position - 1) + input.slice(position);
      charIndex--;
      if (currentWord.slice(0, input.length) == input) {
        wordsContainer.firstChild.textContent = currentWord.slice(input.length);
      }
    }

    if (keyCodes.includes(e.keyCode)) {
      input = [input.slice(0, position), e.key, input.slice(position)].join("");
      charIndex++;
      if (
        currentWord.slice(0, input.length) === input &&
        position === input.length - 1
      ) {
        let modifiedWord = wordsContainer.firstChild.textContent;
        wordsContainer.firstChild.textContent = modifiedWord.slice(1);
      }
    }
  } else e.preventDefault();
});

selectInput.addEventListener("input", () => {
  if (currentWord.slice(0, input.length) == input) {
    selectInput.classList.remove("incorrect");
  } else selectInput.classList.add("incorrect");

  if (selectInput.textContent.length === 0) {
    input = "";
    wordsContainer.firstChild.textContent = currentWord;
  }
});

selectInput.addEventListener("paste", (e) => e.preventDefault());
selectApp.addEventListener("click", () => {
  selectInput.focus();
});

window.addEventListener("load", () => {
  selectTimer.textContent = defaultTime;
  selectWordsCounter.textContent = wordsCounter;
  loadData(wordsContainer, wordIndex, shuffled);
});
