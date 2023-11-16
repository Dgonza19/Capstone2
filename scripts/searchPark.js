'use strict';


window.onload = init;

const parkSearchContainer = document.getElementById("parkSearchContainer");
const locationDropdown = document.getElementById("locationDropdown");
const parkTypeDropdown = document.getElementById("parkTypeDropdown");

function init() {
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.onclick = searchBtnClicked;

    populateLocationDropdown(locationDropdown);
    populateParkTypeDropdown(parkTypeDropdown);

};

// This function should help the dropdown display the array information from nationalParksArray file.
// I start with calling the function getParkInfoArray() and storing the info in var. parksArray.
// Then the for loop iterates over each element in the parksArray.
// the let newOption creates an HTML element, which will look for the state content in park.
// the appendChild, appends the created option element
function populateLocationDropdown() {

    let parksArray = getParkInfoArray();

    for (let park of parksArray) {
        let newOption = new Option(park.State);
        locationDropdown.appendChild(newOption);
    }

};

function populateParkTypeDropdown() {

    let parkTypesArray = getParkTypeData();

    for (let parkType of parkTypesArray) {
        let newOption = new Option(parkType);
        parkTypeDropdown.appendChild(newOption);
    }
};

// this function grabs the info from nationalParkArray and loops through them using a for..of loop
function getParkInfoArray() {

    let locationInfo = [];
    for (let parkInfo of nationalParksArray) {
        if (locationInfo.includes(parkInfo.State) != true) {
            locationInfo.push(parkInfo.State);
        }
    }

    locationInfo.sort();

    // I changed it from return locationInfo to nationalParksArray so that it would
    //return all parks and not just unique states.
    return nationalParksArray;
};

function getParkTypeData() {
    let uniqueParkTypes = [];

    for (let type of parkTypesArray) {
        if (!uniqueParkTypes.includes(type)) {
            uniqueParkTypes.push(type);
        }
    }

    uniqueParkTypes.sort();

    return parkTypesArray;
};

function addLocationToContainer(location,) {

    let accordionItemDiv = document.createElement("div");
    accordionItemDiv.className = "accordion-item";

    parkSearchContainer.appendChild(accordionItemDiv);

    let accordionHeader = document.createElement("h2");
    accordionHeader.className = "accordion-header";

    accordionItemDiv.appendChild(accordionHeader);

    let btn = document.createElement("button");
    btn.className = "accordion-button collapsed";
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "collapse");

    let targetId = "flush-collapse-" + location.LocationID;

    btn.setAttribute("data-bs-target", "#" + targetId);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", targetId);

    let btnTextNode = document.createTextNode(location.LocationName);
    btn.appendChild(btnTextNode);

    accordionHeader.appendChild(btn);

    let flushCollapseDiv = document.createElement("div");
    flushCollapseDiv.id = targetId;
    flushCollapseDiv.className = "accordion-collapse collapse"
    flushCollapseDiv.setAttribute("data-bs-parent", "#parkSearchContainer");

    let accordionBody = document.createElement("div");
    accordionBody.className = "accordion-body";

    let accordionBodyHTML = `
        <p><strong>Location ID:</strong> ${location.LocationID}</p>
        <p><strong>Location Name:</strong> ${location.LocationName}</p>
        <p><strong>Address:</strong> ${location.Address}</p>
        <p><strong>City:</strong> ${location.City}</p>
        <p><strong>State:</strong> ${location.State}</p>
        <p><strong>Zip Code:</strong> ${location.ZipCode}</p>
        <p><strong>Phone:</strong> ${location.Phone}</p>
        <p><strong>Fax:</strong> ${location.Fax}</p>
        <p><strong>Latitude:</strong> ${location.Latitude}</p>
        <p><strong>Longitude:</strong> ${location.Longitude}</p>
    `;

    accordionBody.innerHTML = accordionBodyHTML;

    // let accordionBodyTextNode = document.createTextNode(`LocationID: ${location.LocationID}, LocationName: ${location.LocationName}, Address: ${location.Address}, City: ${location.City}, State: ${location.State}, ZipCode: ${location.ZipCode}, Phone: ${location.Phone}, Fax: ${location.Fax}, Latitude: ${location.Latitude},  Longitude: ${location.Longitude}`);

    flushCollapseDiv.appendChild(accordionBody);

    accordionItemDiv.appendChild(flushCollapseDiv);

};

function searchBtnClicked() {
    parkSearchContainer.innerHTML = "";

    let selectedLocation = locationDropdown.value;
    let selectedParkType = parkTypeDropdown.value;

    if (selectedLocation) {
        // Search by location
        let parksInLocation = nationalParksArray.filter(park => park.State === selectedLocation);

        for (let park of parksInLocation) {
            addLocationToContainer(park);
        }
    }

    if (selectedParkType) {
        // Search by park type in the name (case-sensitive)
        for (let park of nationalParksArray) {
            if (park.LocationName.includes(selectedParkType)) {
                addLocationToContainer(park, selectedParkType);
            }
        }
    }
};



