"use strict";


const mtnDropdown = document.getElementById("mtnDropdown");
const searchBtn = document.getElementById("searchBtn");
const mtnSearchContainer = document.getElementById("mtnSearchContainer");

// I initially had window.onload = init.. and this was causing me some issues. I wanted the script to load 
// after the page was loaded, after a few tries adding the functions within the init() or onload, this version 
// was succesful in executing excatly what I was looking for.
window.onload = function () {

  populateMtnDropdown();
  searchBtn.onclick = searchBtnClicked;

};

function populateMtnDropdown() {

  // console.log('Populating dropdown');

  for (let mountain of mountainsArray) {
      let option = document.createElement("option");
      option.value = mountain.name;
      option.text = mountain.name;
      mtnDropdown.appendChild(option);
  }

  // mtnDropdown.value = "";
};



function addMtnInfoToContainer(information) {
  let accordionItemDiv = document.createElement("div");
  accordionItemDiv.className = "accordion-item";

  let accordionHeader = document.createElement("h2");
  accordionHeader.className = "accordion-header";

  let btn = document.createElement("button");
  btn.className = "accordion-button";
  btn.type = "button";
  btn.setAttribute("data-bs-toggle", "collapse");
  btn.setAttribute("data-bs-target", "#collapse-");

  let btnTextNode = document.createTextNode(information.name);
  btn.appendChild(btnTextNode);

  accordionHeader.appendChild(btn);

  let flushCollapseDiv = document.createElement("div");
  flushCollapseDiv.id = "collapse-";
  flushCollapseDiv.className = "accordion-collapse collapse";

  let accordionBody = document.createElement("div");
  accordionBody.className = "accordion-body";

  let accordionBodyHTML = `
      <p><strong>Name:</strong> ${information.name}</p>
      <p><strong>Elevation:</strong> ${information.elevation}</p>
      <p><strong>Effort:</strong> ${information.effort}</p>
      <img src="images/${information.imagePath}" alt="${information.name}" style="max-width: 100%;">
      <p><strong>Desc:</strong> ${information.desc}</p>
      <p><strong>Coords:</strong></p>
      <p><strong></strong> ${information.coords.lat}, ${information.coords.lng}</p>
  `;

  accordionBody.innerHTML = accordionBodyHTML;

  flushCollapseDiv.appendChild(accordionBody);

  accordionItemDiv.appendChild(accordionHeader);
  accordionItemDiv.appendChild(flushCollapseDiv);

  mtnSearchContainer.appendChild(accordionItemDiv);
};


function searchBtnClicked() {
  mtnSearchContainer.innerHTML = "";

  let selectedLocation = mtnDropdown.value;

  if (selectedLocation) {
    // Find the selected mountain object from the array
    let selectedMountain = mountainsArray.find(mountainInfo => mountainInfo.name === selectedLocation);

    // Display information for the selected mountain
    if (selectedMountain) {
      addMtnInfoToContainer(selectedMountain);
    }
  }
};
