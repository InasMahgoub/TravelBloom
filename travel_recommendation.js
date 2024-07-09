dataURL = "data/travel_recommendation.json";
let banner = document.getElementsByClassName("banner");
let keyword = "";
let destinations = [];
let cities = [];

//  Fetch data from json fille

function getData() {
  const serachKeyword = document.getElementById("keyword");
  const serachInput = serachKeyword.value.toLowerCase();
  fetch(dataURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      filterData(data, serachInput);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error);
    });
}

// Filter data

function filterData(allData, serachInput) {
  console.log(serachInput);
  switch (serachInput) {
    case "temple":
    case "temples":
      showData(allData.temples, false);
      break;
    case "country":
    case "countries":
      showData(allData.countries, true);
      break;
    case "beach":
    case "beaches":
      showData(allData.beaches, false);
      break;
    default:
      showMessage();
  }
}

// Show Data

function showData(destinations, isCountries) {
  clearData();
  if (isCountries === true) {
    let cities = [];
    for (i = 0; i < destinations.length; i++) {
      cities = cities.concat(destinations[i].cities);
    }
    destinations = cities;
  }
  destinations?.forEach((item) => {
    let itemImageNode = document.createElement("img");
    itemImageNode.setAttribute("src", item.imageUrl);
    let itemTitleNode = document.createElement("h3");
    itemTitleNode.innerText = item.name;
    let itemDescription = document.createElement("p");
    itemDescription.innerText = item.description;
    let itemDiv = document.createElement("div");
    itemDiv.append(itemImageNode, itemTitleNode, itemDescription);
    document.getElementById("results").append(itemDiv);
  });
}

// Show message is no results found

function showMessage() {
  let messageNode = document.createElement("h3");
  messageNode.setAttribute("class", "message");
  messageNode.innerText = "Sorry, No Results Found.";
  document.getElementById("results").append(messageNode);
}

// Clear search and reuslts

function clearSearch() {
  document.getElementById("keyword").value = "";
}

function clearData() {
  const dataNode = document.getElementById("results");
  while (dataNode.lastElementChild) {
    dataNode.removeChild(dataNode.lastElementChild);
  }
}

function clearAll() {
  clearSearch();
  clearData();
}
