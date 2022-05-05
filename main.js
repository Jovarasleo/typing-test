import "./style.css";
import loadArray from "./util/loadData";
import addArrItem from "./util//offLoadData";
import keyCodes from "./data/keyCodes";
import shuffled from "./util/shuffledArray";
import getCaretPosition from "./util/getCaretPosition";
import myTimer from "./util/timer";

const selectInput = document.querySelector(".input");
const selectApp = document.querySelector("#app");
const selectDataArray = document.querySelector(".secondHalf");
const writtenWordsArr = document.querySelector(".writtenWords");
const selectWordsCounter = document.querySelector(".card--wordCounter");
const selectCharCounter = document.querySelector(".card--charCounter");
const selectAccuracyCounter = document.querySelector(".card--accuracyCountery");

var wordIndex = 0;
var charIndex = 0;
var currentWord = shuffled[wordIndex];
var input = "";
let dataArray = [];
let writtenDataArray = [];
let startTimer = true;

export let accuracy;
export let wordsCounter = 0;
export let charCounter = 0;

export function reset() {
  charIndex = 0;
  currentWord = shuffled[wordIndex];
  input = "";
  wordsCounter = 0;
  charCounter = 0;
  wordIndex = 0;
  startTimer = true;
  dataArray = [];
  writtenDataArray = [];

  selectAccuracyCounter.textContent = 0;
  selectInput.textContent = "";
  selectCharCounter.textContent = charCounter;
  selectWordsCounter.textContent = wordsCounter;
  selectDataArray.innerHTML = "";
  loadArray(selectDataArray, wordIndex, true);
  currentWord = shuffled[wordIndex];
  selectDataArray.firstChild.textContent = currentWord;
  addArrItem(writtenWordsArr, dataArray, writtenDataArray);
}

selectInput.addEventListener("keydown", (e) => {
  if (startTimer) {
    startTimer = false;
    myTimer(1000).start();
  }

  if (myTimer().interval !== 0) {
    let position = getCaretPosition(e.target);
    if (e.keyCode === 32 || e.keyCode === 13) {
      dataArray.push(currentWord);
      writtenDataArray.push(input);
      e.preventDefault();
      charIndex = 0;
      input = "";
      if (selectInput.textContent) {
        wordIndex++;
        if (selectInput.textContent === currentWord) {
          wordsCounter++;
          selectWordsCounter.textContent = wordsCounter;
        }
        accuracy = Math.round((wordsCounter / wordIndex) * 100);
        selectAccuracyCounter.textContent = accuracy;
        addArrItem(writtenWordsArr, dataArray, writtenDataArray);
        selectDataArray.innerHTML = "";
        loadArray(selectDataArray, wordIndex);
        selectInput.textContent = "";
      }
      currentWord = shuffled[wordIndex];
    }
    if (e.key === "Backspace" && charIndex >= 1 && position > 0) {
      input = input.slice(0, position - 1) + input.slice(position);
      charIndex = charIndex - 1;
      if (currentWord.slice(0, input.length) == input) {
        charCounter--;
        selectCharCounter.textContent = charCounter;
        selectDataArray.firstChild.textContent = currentWord.slice(
          input.length
        );
      }
    }

    if (keyCodes.includes(e.keyCode)) {
      input = [input.slice(0, position), e.key, input.slice(position)].join("");
      charIndex++;
      if (
        currentWord.slice(0, input.length) === input &&
        position === input.length - 1
      ) {
        charCounter++;
        selectCharCounter.textContent = charCounter;
        let modifiedWord = selectDataArray.firstChild.textContent;
        selectDataArray.firstChild.textContent = modifiedWord.slice(1);
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
    selectDataArray.firstChild.textContent = currentWord;
    console.log("no input");
  }
});

selectInput.addEventListener("paste", (e) => e.preventDefault());
selectApp.addEventListener("click", () => {
  selectInput.focus();
});
//initiate data load
window.addEventListener("load", () => {
  selectWordsCounter.textContent = wordsCounter;
  loadArray(selectDataArray, wordIndex);
});
