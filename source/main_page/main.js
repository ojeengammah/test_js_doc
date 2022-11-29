/* ################################### */
/* ######### EVENT LISTENERS ######### */
/* ################################### */


// Initialize page with previously-stored chore list
window.addEventListener('DOMContentLoaded', init);

// Respond to clicking "add chore" button
const button = document.getElementById('add-chore');
button.addEventListener('click', () => {
  // Begin the add-chore page
  let modalBtns = document.getElementById("add-chore");
  modalBtns.onclick = function () {
      let modal = modalBtns.getAttribute('data-modal');
      document.getElementById(modal).style.display = "block";
  };
  // Add a button to close the form screen. 
  let closeBtns = document.querySelector(".close");
  closeBtns.onclick = function () {
      let modal = closeBtns.closest(".modal");
      modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the form, close it
  window.onclick = function (event) {
    if (event.target.className === "modal") {
      event.target.style.display = "none";
    }
  };
  // When the user clicks submit, store the data and put into chore-card element
  let submitBtn = document.getElementById('submit');
  submitBtn.onclick = function (event) {
    // Transfer data from form to new chor card
    event.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const chore = Object.fromEntries(formData);
    addChore(chore);
    
    // Update page and exit "add chore" form
    updateDocument();
    let modal = modalBtns.getAttribute("data-modal");
    document.getElementById(modal).style.display = "none";
  };
});

// Save chores to persistent storage when the page closes
window.addEventListener('unload', saveChores);


/* ################################### */
/* ############ FUNCTIONS ############ */
/* ################################### */


/**
 * Initialize page with chores from persistent storage
 * Postcondition: All chores in the chore list are available in local storage and displayed on the screen
 */
async function init() {
  // Get chores from persistent storage into local storage
  // When done update the document with local storage chore cards
  getChores().then(updateDocument);
}


/**
 * Retrieves chores from persistent storage and places them in local storage
 * Precondition: All chores to be displayed in the chore list are existent in persistent storage and correctly sorted
 * Postcondition: All chores to be displayed in the chore list are existent in a sorted array in local storage with the "chores" key
 * @async
 */
async function getChores(){
  // TODO implement persistent storage.
  if(!localStorage.getItem("chores")){
    // For now, just make an empty "chores" array in local storage, if it doesn't exist
    localStorage.setItem("chores","[]");
  }
  console.log("Chores Retrieved (Dummy Function)");
}

// TODO Check this
function menu(){
  // Open the drop-down menu
  let modalBtns = document.getElementById("drop-down");
  modalBtns.onclick = function () {
      let modal = modalBtns.getAttribute("data-modal");
      alert(document.getElementById(modal));
      document.getElementById(modal).style.display = "block";
  };
  let closeBtns = document.querySelector(".close");
  closeBtns.onclick = function () {
      let modal = closeBtns.closest(".modal_menu");
      modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the menu, close it
  window.onclick = function (event) {
    if (event.target.className === "modal_menu") {
      event.target.style.display = "none";
    }
  };
}

/**
 * Given a chore, add it to local storage
 * Precondition: There exists a sorted array in local storage with the key "chores"
 * Postcondition: The new chore is added in the correct position to this array in local storage
 * @param {Object} chore - A JSON object describing the chore to be added
 */
function addChore(chore) {
  // Retrieve and parse chores from local storage
  let chores = localStorage.getItem("chores");
  chores = JSON.parse(chores);
  let initialLength = chores.length;

  // Add chore into correct order position in chores array.
  for(let i = 0; i < chores.length; i++){
    if(reformatDate(chore.date) <= reformatDate(chores[i].date)){
      chores.splice(i, 0, chore);
      break;
    }
  }

  // Add chore at end if not added already
  if(chores.length == initialLength){
    chores.push(chore);
  }

  // Set into local storage
  localStorage.setItem("chores", JSON.stringify(chores));
}

/**
 * Format a date string to make it lexicographically comparable
 * @param {string} date - a date in mm/dd/yyyy format
 * @returns string newDate in yyyymmdd format
 */
function reformatDate(date){
  // Separate and reorder the elements of the given date
  let newDate = date.split("/");
  newDate = newDate[2] + newDate[0] + newDate[1];
  return newDate;
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
