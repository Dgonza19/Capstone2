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
// the appendChild, appends the created option element to HTMl element called locationsDropdown(line 7).

// In summary, the purpose of this function is to populate a dropdown list 
// with options representing the states of parks.

function populateLocationDropdown() {

    let parkInfoArray = getParkInfoArray();

    for (let states of parkInfoArray) {
        let newOption = new Option(states.State);
        locationDropdown.appendChild(newOption);
    }

};

// This function is very similar to the one above (line 28).
// with the diffence that it is grabbing the data from parkTypeDropdow (line 8).

function populateParkTypeDropdown() {

    let parkTypesArray = getParkTypeData();

    for (let parkType of parkTypesArray) {
        let newOption = new Option(parkType);
        parkTypeDropdown.appendChild(newOption);
    }
};

// Declare the function.
// Then I created an empty array called locationInfo to store unique state info.
// Started a loop on (line 59), that iterates over each element in the nationalParksArray.
// (line 61) Checks if the State property of the current parkInfo is not already in the locationInfo array
// if it is not, then it pushes the state property of the current 'parkInfo' into the 'locationInfo' array.

// In summary, the purpose of this function is to iterate over nationalParksArray 
// extract unique state information, sort it alphabetically, and then return the entire array of national parks.

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

// This function is similiar to the one above (line 62).
// with the exceptiong that it returns parkTypeArray and it is utilized for user to search through park type.

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

// Defined function that accepts parameter of (location).
// I used accordion component from Boostrap to programmaticaly populate the data.
// by creating div elements, appending & creating the HTML elements, as well as locating the id from NationalParks.html.
// On (line 136) i generated HTML content for the accordion body based on the properties given to each location.
// initially I attenmpted (line 152).
// next I set the innerHTML of the accordiongBody div with the generated HTML content. *
// appended the accordiongBody to the flushCollapseDiv on (line 156),
// and lastly appended the flushCollapsedDiv to tge accordionItemDiv.

// In summary, this function creates and appends HTML elements to the parkSearchContainer to display info the locations.
// The function dynamically generates HTML elements based on the location selected information provided and appends them to the container.

function addLocationToContainer(location) {

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

// This function specifies what is triggered when searchBtnClicked  is clicked.
// first I cleared the inner HTML content, to ensure a fresh display for the search results.
// Then in (line 172 and 173) I retrieved the selected values from the locationDropdown and ParkTypeDropdown.
// Then we check if a location is selected with if statement, and filter the nationalParksArray to get the parks in the selected location.
// it then iterates through the parks in the selected location to add them to the container using addLocationToContainer.
// same with the parktype.

// In summary, this function retrieves the selected values from dropdowns, searches for parks based on the selected location or park type,
// and dynamically adds the matching parks to the parkSearchContainer.

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



