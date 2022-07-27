import "./style.css";
import loadArray from "./util/loadData";
import addArrItem from "./util/offLoadData";
import keyCodes from "./data/keyCodes";
import randomArrayShuffle from "./util/shuffledArray";
import getCaretPosition from "./util/getCaretPosition";
import myTimer from "./util/timer";
import backdrop from "./component/backdrop";
import words from "./data/data";

const selectInput = document.querySelector(".input");
const selectApp = document.querySelector("#app");
const wordsContainer = document.querySelector(".secondHalf");
const writtenWordsContainer = document.querySelector(".writtenWords");
const selectWordsCounter = document.querySelector(".card--wordCounter");
const selectCharCounter = document.querySelector(".card--charCounter");
const selectAccuracyCounter = document.querySelector(".card--accuracyCountery");
const selectTimer = document.querySelector(".card--timer");

const defaultTime = 5;
let shuffled = randomArrayShuffle(words);
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
  shuffled = randomArrayShuffle(words);
  currentWord = shuffled[wordIndex];
  input = "";
  wordsCounter = 0;
  charCounter = 0;
  wordIndex = 0;
  startTimer = true;
  dataArray = [];
  writtenDataArray = [];

  selectTimer.textContent = defaultTime;
  selectAccuracyCounter.textContent = 0;
  selectInput.textContent = "";
  selectCharCounter.textContent = charCounter;
  selectWordsCounter.textContent = wordsCounter;
  wordsContainer.innerHTML = "";
  loadArray(wordsContainer, wordIndex, shuffled);
  currentWord = shuffled[wordIndex];
  wordsContainer.firstChild.textContent = currentWord;
  addArrItem(writtenWordsContainer, dataArray, writtenDataArray);
}

selectInput.addEventListener("keydown", (e) => {
  if (startTimer) {
    startTimer = false;
    myTimer(defaultTime, () =>
      backdrop(reset, wordsCounter, charCounter, accuracy)
    ).start();
  }

  if (myTimer().interval !== 0) {
    let position = getCaretPosition(e.target);
    if (e.keyCode === 32 || e.keyCode === 13) {
      dataArray.push(currentWord);
      writtenDataArray.push(input);
      e.preventDefault();
      charIndex = 0;

      if (selectInput.textContent) {
        wordIndex++;
        if (selectInput.textContent === currentWord) {
          charCounter += input.length;
          console.log(charCounter);
          selectCharCounter.textContent = charCounter;
          wordsCounter++;
          selectWordsCounter.textContent = wordsCounter;
        }
        accuracy = Math.round((wordsCounter / wordIndex) * 100);
        selectAccuracyCounter.textContent = accuracy;
        addArrItem(writtenWordsContainer, dataArray, writtenDataArray);
        wordsContainer.innerHTML = "";
        loadArray(wordsContainer, wordIndex, shuffled);
        selectInput.textContent = "";
      }
      input = "";
      currentWord = shuffled[wordIndex];
    }
    if (e.key === "Backspace" && charIndex >= 1 && position > 0) {
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
  loadArray(wordsContainer, wordIndex, shuffled);
});
