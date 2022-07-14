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

// BASIC DISPLAY FUNCTION
function display(thisBaby) {
  return `
  <div>
    ${thisBaby.name} (Rank: ${thisBaby.rank}, Gender: ${thisBaby.gender})
  </div>`;
}

// Display All Baby Names
function displayAll() {
  container.innerHTML = "";
  nameCountSpan.innerHTML = "";
  let count = 0;
  let str = "";
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    str += display(thisBaby);
    count++
  }
  container.innerHTML = str;
  nameCountSpan.innerHTML = count;
}

// Display Names by Gender
function searchGender() {
  container.innerHTML = "";
  nameCountSpan.innerHTML = "";
  let genderInput = prompt("Please enter a gender (Boy/Girl)");
  let count = 0;
  let str = "";
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    if (thisBaby.gender === genderInput) {
      str += display(thisBaby);
      count++
    }
  }
  container.innerHTML = str;
  nameCountSpan.innerHTML = count;
}

// Display Names within a Range of Ranks
function searchRank() {
  container.innerHTML = "";
  nameCountSpan.innerHTML = "";
  let min = prompt("Please enter a minimum rank: ");
  let max = prompt("Please enter a maximum rank: ");
  let count = 0;
  let str = "";
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    if (thisBaby.rank >= min && thisBaby.rank <= max) {
      str += display(thisBaby);
      count++
    }
  }
  container.innerHTML = str;
  nameCountSpan.innerHTML = count;
}

// Display Names with Starting Letter
function searchStartingLetter() {
  container.innerHTML = "";
  nameCountSpan.innerHTML = "";
  let letter = prompt("Please enter a starting letter: ").toUpperCase();
  let count = 0;
  let str = "";
  for (let i = 0; i < babyData.length; i++) {
    let thisBaby = babyData[i];
    if (thisBaby.name.startsWith(letter)) {
      str += display(thisBaby);
      count++
    }
  }
  container.innerHTML = str;
  nameCountSpan.innerHTML = count;
}

// Display Names with a Specific Length
function searchLength() {
  container.innerHTML = "";
  nameCountSpan.innerHTML = "";
  let num = prompt("Please enter a name length: ");
  let count = 0;
  let str = "";
  for (let i = 0; i < babyData.length; i++) {
    let thisBabyName = babyData[i].name;
    let strLength = JSON.stringify(thisBabyName.length);
    if (strLength === num) {
      str += display(babyData[i]);
      count++
    }
  }
  container.innerHTML = str;
  nameCountSpan.innerHTML = count;
}
