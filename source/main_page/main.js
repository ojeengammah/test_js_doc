// TODO remove the preloaded chores file
//var historyFile = './JSON_files/History_chore.json';
//var choreListFile = './JSON_files/Chore_list.json';

/* ################################### */
/* ######### EVENT LISTENERS ######### */
/* ################################### */

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);
// TODO Update event listener for adding chores if needed

// Refer to plus button in the main page
const button = document.getElementById('add-chore');
// Refer to plus button in the main page
// Begin the add-chore page
let modalBtns = document.getElementById("add-chore");
modalBtns.onclick = function () {
    let modal = modalBtns.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
};
//Add a button to close the form screen. 
let closeBtns = document.querySelector(".close");
closeBtns.onclick = function () {
    let modal = closeBtns.closest(".modal");
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};
// When the user clicks submit, store the data and put into chore-card element
let submitBtn = document.getElementById('submit');
submitBtn.onclick = function (event) {
  event.preventDefault();
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const chore = Object.fromEntries(formData);
  console.log(chore);
  addChore(chore);
};
// TODO as specified below, add event listener for removing chores

/** To be completed. An eventListener for removing the chore card will be here. 
 * When the user drag chore card away or when the due date is passed, remove_chores 
 * will be called to remove that chore card from History_chore.json. 
 */

function clickChore(){
  setTimeout( ()=>{
    const chore_card = document.querySelector('chore-card');
    const assignee = document.querySelector('chore-card').shadowRoot.querySelector('article').querySelector('.item1').querySelector('figcaption').innerHTML;
    if(chore_card != null){
      chore_card.addEventListener('click', ()=>{
        let chores = JSON.parse(localStorage.getItem('chores'));
        document.querySelector('.info_box p').innerHTML = assignee;
      })
    }
  });
 
}

/* ################################### */
/* ############ FUNCTIONS ############ */
/* ################################### */

// Starts the program, all function calls trace back here
// TODO Update init if needed
async function init() {
  menu();
  //Get chores from persistent storage into local storage
  //When done update the document with local storage chore cards
  getChores().then(updateDocument);
  clickChore();
  // Get the recipes from history_chore.json
  /*
  let chores;
  menu();
  try {
    chores = await getChores(historyFile);
    addChores();
  } catch (err) {
    console.error(err);
  }
  
  // Add each recipe to the <main> element
  addChoresToDocument(chores);
  */
}

/**
 * Sort chores based on the user's selection: due date, assignee, or section
 * Precondition: None
 * Postcondition: All chores are displayed in the sorted way.
 */

/**
 * Retrieves chores from persistent storage and places them in local storage
 * Precondition: All chores to be displayed in the chore list are existent in persistent storage
 * Postcondition: All chores to be displayed in the chore list are existent in local storage, with the "chores" key
 */
async function getChores(){
  // TODO fix contents
  if(!localStorage.getItem("chores")){
    // For now, just make an empty "chores" array in local storage, if it doesn't exist
    localStorage.setItem("chores","[]");
  }
  console.log("Chores Retrieved (Dummy Function)");
  // TODO Use following for reference, but delete once complete
  /*
  const precious_chores = [];
  const response = await fetch(file);
  //parses JSON response into native JavaScript objects
  const chores = await response.json();
  return chores;
  */
}
function menu(){
  // Begin the menu page
  let btn = document.getElementById("drop-down");
  let menu = document.getElementById("menu_box");
  btn.addEventListener('click', ()=>{
    //console.log(menu.style.display);
    if (menu.style.display === 'none') {
      menu.style.display = 'block';
    }
    else if(menu.style.display === ''){
      menu.style.display = 'block';
    }
    else{
      menu.style.display = 'none';
    }
    // user clicks on by due date button
    document.getElementById('due_date_btn').onclick = function(){
      console.log("due date button was clicked");
    }
    document.getElementById('section_btn').onclick = function(){
      console.log("section button was clicked");
    }
    document.getElementById('assignee_btn').onclick = function(){
      console.log("assignee button was clicked");
    }
  });

}
/**
 * Given a chore, add it to local storage
 * Precondition: There exists an array in local storage with the key "chores"
 * Postcondition: The new chore is added to this array in local storage
 * @param {Object} chore - A JSON object describing the chore to be added
 */
function addChore(chore) {
  // There should be NO EVENT LISTENERS in this function
  let chores = localStorage.getItem("chores");
  chores = JSON.parse(chores);
  //Add chore into correct order position in chores array.
  for(let i = 0; i < chores.length; i++){
    if(chore.time<chores[i].time){
      chores.splice(i, 0, chore);
      break;
    }
  }
  //If the chores is empty.
  if(chores.length == 0){
    chores.push(chore);
  }
  //Set into local storage
  localStorage.setItem("chores",JSON.stringify(chores));
  // TODO Use following for reference, but delete once complete
  //Below is the code for form. Will implement form outside of addChores.
  /*
  // Begin the add-chore page
  const chores = [];
  // Refer to plus button in the main page

  // Begin the add-chore page
  let modalBtns = document.getElementById("add-chore");
  modalBtns.onclick = function () {
      let modal = modalBtns.getAttribute("data-modal");
      document.getElementById(modal).style.display = "block";
  };
  let closeBtns = document.querySelector(".close");
  closeBtns.onclick = function () {
      let modal = closeBtns.closest(".modal");
      modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target.className === "modal") {
      event.target.style.display = "none";
    }
  };
  // When the user clicks submit, store the data and put into chore-card element
  let submitBtn = document.getElementById('submit');
  submitBtn.onclick = function (event) {
    event.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const chore = Object.fromEntries(formData);
    console.log(chore);
  // Create a new element chore-card in the main
  let chore_card = document.createElement("chore-card");
  chore_card.data = chore;
  document.querySelector("main").appendChild(chore_card);
  const data = JSON.stringify(chore);
  saveDataToJson(data, historyFile);
  */
  
  // Check if the user enter the valid input
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if(chore['choreName'] == '' || chore['section'] == '' || chore['assigneeSrc'] == '' || chore['date'] == ''){
      alert('Please enter the valid response.');
    }
    else if(chore['date'].match(regex) == null){
      alert('Please enter a valid date (mm/dd/yyyy).');
    }
    // If the user enter the valid input, add it into chore-card and close the submit form
    else{
      // Create a new element chore-card in the main
      let chore_card = document.createElement("chore-card");
      chore_card.data = chore;
      document.querySelector("#chore-cards").appendChild(chore_card);
      const data = JSON.stringify(chore);
      chores.push(chore);
      form.reset();
      //saveDataToJson(data, historyFile);
    }
    /*let chore_card = document.createElement("chore-card");
    chore_card.data = chore;
    document.querySelector("main").appendChild(chore_card);
    const data = JSON.stringify(chore);
    chores.push(chore);
    form.reset();*/
}


/**
 * Given a chore, remove it from local storage
 * Postcondition: The given chore no longer exists in the array in local storage
 * @param {Object} chore - A JSON object describing the chore to be removed
 */
 export function removeChore(chore) {
  // Get chores from localStorage.
  let chores = localStorage.getItem("chores");
  
  // Check if the chore we want to delete exists in the chore list
  if(!chores.includes(JSON.stringify(chore))){
    console.log("The chore does not exist");
    return;
  }

  chores = JSON.parse(chores);
  // If the chore exists then iterate through the chore list
  for(let i = 0; i < chores.length; i++){
    if(JSON.stringify(chore) == JSON.stringify(chores[i])){
      // Delete the chore
      chores.splice(i, 1);
      break;
    }
  }
  // Put new chores array with removed element into local storage
  localStorage.setItem("chores",JSON.stringify(chores));
}


/**
 * Save all chores from local storage in persistent storage
 * Precondition: There exists an array in local storage with the key "chores"
 * Postcondition: Persistent storage is updated to match the "chores" array in local storage
 * @async
 */
async function saveChores() {
  // TODO Implement feature to save chores to persistent storage
  console.log("Chores Saved!(Dummy Function)");
}

/**
 * Update the chore list in the DOM to correctly include all elements in the "chores" array in local storage
 * Precondition: There exists a sorted array in local storage with the key "chores"
 * Postcondition: The chore list in the DOM contains all chores from local storage sorted by priority
 */
export function updateDocument() {
  // Get and parse chores from local storage
  let chores = localStorage.getItem("chores");
  chores = JSON.parse(chores);

  // Get and clear chore list element on main page
  let choresDOM = document.getElementById("chore-cards");
  choresDOM.innerHTML = "";

  // Create and add a chore card for each chore into the main page
  for(let i = 0; i < chores.length; i++){
    let choreCard = document.createElement("chore-card");
    choreCard.data = chores[i];
    choresDOM.append(choreCard);
  }
}
