// ^###### HTML Element
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var siteContainer = document.getElementById("sitesTable");
var addButton = document.getElementById("addButton");
var updateButton = document.getElementById("updateButton");
var searchBar = document.getElementById("searchBar");
var startPara = document.getElementById("startPara");
var regexInput = {
  siteNameVali: /^[A-Z][\sa-z0-9_]{3,}$/,
  siteUrlVali: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}(\/\S*)?$/,
};

// &###### App Variable
// ! ==> by using logical operator
var siteList = JSON.parse(localStorage.getItem("siteURLlist")) || [];
// ! ==> by using if condition
// if (localStorage.getItem("siteURLlist")) {
//   var siteList = JSON.parse(localStorage.getItem("siteURLlist"));
// } else {
//   siteList = [];
// }

displayAllSites();

// *###### Function

// ~addSite function (C ===> CRUD)
function addSite() {
  if (
    isValidInput(regexInput.siteNameVali, siteNameInput) &
    isValidInput(regexInput.siteUrlVali, siteUrlInput)
  ) {
    var siteInfo = {
      siteName: siteNameInput.value,
      sitUrl: siteUrlInput.value,
    };

    //  ^ display Site
    siteList.push(siteInfo);

    // Clear and redisplay all sites to update table and message
    siteContainer.innerHTML = "";
    displayAllSites();

    // ^ reset all inputs
    resetInputs();

    // ^ local storage
    setLocalStroage();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: "Make Sure You Entered The Inputs Right 😅",
    });
  }
}

// ~ set local storage function
function setLocalStroage() {
  localStorage.setItem("siteURLlist", JSON.stringify(siteList));
}

// ~ display Sites name and url in the table (R (Read/Retrive) ===> CRUD)
function displaySite(index) {
  var siteRow = `<tr>
              <td>${index}</td>
              <td>${siteList[index].siteName}</td>
              <td>
              
                <button
                class="btn visit"
                onclick="window.open('${siteList[index].sitUrl}', '_blank')"
                >
                Visit <i class="fa-solid fa-eye ms-2"></i>
                </button>
              </td>
              <td>
                <button class="btn delete" onclick = "deleteSite(${index})">
                  Delete <i class="fa-solid fa-trash-can ms-2"></i>
                </button>
              </td>
              <td>
                 <button class="btn update" onclick = "moveDataUp(${index})">
                  Update <i class="fa-solid fa-pen-to-square ms-2"></i>
                </button>
              </td>
            </tr>`;

  siteContainer.innerHTML += siteRow;
}
// ~display all products fucntion
function displayAllSites() {
  // Clear the table
  siteContainer.innerHTML = "";

  if (siteList.length === 0) {
    startPara.classList.remove("d-none");
    startPara.classList.add("d-block");
  } else {
    startPara.classList.remove("d-block");
    startPara.classList.add("d-none");
  }
  for (var i = 0; i <= siteList.length - 1; i++) {
    displaySite(i);
  }
}
// ~ reset all inputs function
function resetInputs() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
}

// ~update function  U  ===> CRUD
// step1==> move site data to the inputs
var updatedIndex;
function moveDataUp(index) {
  siteNameInput.value = siteList[index].siteName;
  siteUrlInput.value = siteList[index].sitUrl;
  // set updatedindex
  updatedIndex = index;
  // reset the buttons
  addButton.classList.replace("d-block", "d-none");
  updateButton.classList.replace("d-none", "d-block");
}
function updateSite() {
  siteList[updatedIndex].siteName = siteNameInput.value;
  siteList[updatedIndex].sitUrl = siteUrlInput.value;
  // reset local storage
  setLocalStroage();
  //reset inputs
  resetInputs();
  // display it
  siteContainer.innerHTML = "";
  displayAllSites();
  // reset the buttons
  addButton.classList.replace("d-none", "d-block");
  updateButton.classList.replace("d-block", "d-none");
}

// ~ Delete function ==> D ===> CRUD
function deleteSite(index) {
  siteList.splice(index, 1);
  // Delete it from local storage
  setLocalStroage();
  // display it
  siteContainer.innerHTML = "";
  displayAllSites();
}

// ~ validation input function
function isValidInput(regex, siteInputElement) {
  if (regex.test(siteInputElement.value)) {
    siteInputElement.classList.add("is-valid");
    siteInputElement.classList.remove("is-invalid");
    siteInputElement.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    siteInputElement.classList.add("is-invalid");
    siteInputElement.classList.remove("is-valid");
    siteInputElement.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

// ~ search function
function searchBySiteName() {
  siteContainer.innerHTML = "";
  var searchKeyWord = searchBar.value;
  for (var i = 0; i < siteList.length; i++) {
    if (
      siteList[i].siteName.toLowerCase().includes(searchKeyWord.toLowerCase())
    ) {
      displaySite(i);
    }
  }
}
