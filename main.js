// Baby Names Data (Top 50 Boy/Girl 2022)
// Baby Center (babycenter.com)
// https://www.babycenter.com/baby-names/most-popular/top-baby-names#popularNameList

// Variables for html elements
let goBtn = document.getElementById("go-btn");
let menuSelect = document.getElementById("menu-select");
let container = document.getElementById("container");
let nameCountSpan = document.getElementById("name-count");

// Initialize Array of Character Objects from json file
let babyData = [];
fetch("baby-names-data.json")
  .then((res) => res.json())
  .then((data) => (babyData = data));

// Event Listener on Go Button
goBtn.addEventListener("click", goBtnClicked);

// Process Go Button Click
function goBtnClicked() {
  // Get Menu Selection
  let selection = menuSelect.value;

  // Process Menu Selection
  if (selection === "display-all") {
    displayAll();
  } else if (selection === "gender") {
    searchGender();
  } else if (selection === "rank") {
    searchRank();
  } else if (selection === "starting-letter") {
    searchStartingLetter();
  } else if (selection === "length") {
    searchLength();
  }
}

// GLOBAL VARIABLES
let count = 0;
let str = "";

// BASIC DISPLAY FUNCTION
function display(thisBaby) {
  return `
  <div>
    ${thisBaby.name} (Rank: ${thisBaby.rank}, Gender: ${thisBaby.gender})
  </div>`;
}

function basicReset() {
  container.innerHTML = "";
  nameCountSpan.innerHTML = "";
  count = 0;
  str = "";
}

function displayData() {
  container.innerHTML = str;
  nameCountSpan.innerHTML = count;
}

// Display All Baby Names
function displayAll() {
  basicReset();
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    str += display(thisBaby);
    count++
  }
  displayData()
}

// Display Names by Gender
function searchGender() {
  basicReset();
  let genderInput = prompt("Please enter a gender (Boy/Girl)");
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    if (thisBaby.gender === genderInput) {
      str += display(thisBaby);
      count++
    }
  }
  displayData()
}

// Display Names within a Range of Ranks
function searchRank() {
  basicReset();
  let min = prompt("Please enter a minimum rank: ");
  let max = prompt("Please enter a maximum rank: ");
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    if (thisBaby.rank >= min && thisBaby.rank <= max) {
      str += display(thisBaby);
      count++
    }
  }
  displayData()
}

// Display Names with Starting Letter
function searchStartingLetter() {
  basicReset();
  let letter = prompt("Please enter a starting letter: ").toUpperCase();
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    if (thisBaby.name.startsWith(letter)) {
      str += display(thisBaby);
      count++
    }
  }
  displayData()
}

// Display Names with a Specific Length
function searchLength() {
  basicReset();
  let num = prompt("Please enter a name length: ");
  for (let i = 0; i < babyData.length; i++) {
    let thisBabyName = babyData[i].name;
    let strLength = JSON.stringify(thisBabyName.length);
    if (strLength === num) {
      str += display(babyData[i]);
      count++
    }
  }
  displayData()
}
