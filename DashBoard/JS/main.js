let dateInput = document.getElementById("date-input");
let search = document.getElementById("search");
let Completed = document.getElementById("Completed");
let Processing = document.getElementById("Processing");
let OnHold = document.getElementById("On Hold");
let Rejected = document.getElementById("Rejected");
let InTransit = document.getElementById("In Transit");
let AllStatus = document.getElementById("All Status");
let Grocery = document.getElementById("Grocery");
let Medicine = document.getElementById("Medicine");
let Electric = document.getElementById("Electric");
let table = document.querySelector("table tbody");

// console.log(filterDate.value );

let allData = [];

window.addEventListener('load', function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);
  xhr.send();

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      allData = JSON.parse(xhr.responseText);
      renderData(allData);
    }
  });
});

function clearTable() {
  table.innerHTML = "";
}

function applyStatusStyle(element, status) {
  switch (status) {
    case "Completed":
      element.style.backgroundColor = "#CCF0EB";
      element.style.color = "#00B69B";
      break;
    case "In Transit":
      element.style.backgroundColor = "#ffa3d7";
      element.style.color = "#BA29FF";
      break;
    case "Processing":
      element.style.backgroundColor = "#E0D4FC";
      element.style.color = "#6226EF";
      break;
    case "On Hold":
      element.style.backgroundColor = "#FFEDDD";
      element.style.color = "#FFA95A";
      break;
    case "Rejected":
      element.style.backgroundColor = "#FCD7D4";
      element.style.color = "#F25F51";
      break;
    default:
      element.style.backgroundColor = "#ddd";
      element.style.color = "#333";
  }
}

function renderData(data) {
  clearTable();
  data.forEach(obj => {
    let row = `
      <tr>
        <td>${obj.id}</td>
        <td>${obj.name}</td>
        <td>${obj.address}</td>
        <td>${obj.date}</td>
        <td>${obj.type}</td>
        <td><span id="status-${obj.id}" class="status">${obj.status}</span></td>
      </tr>
    `;
    table.insertAdjacentHTML("beforeend", row);

    let statusElement = document.getElementById(`status-${obj.id}`);
    applyStatusStyle(statusElement, obj.status);
  });
}

// -- Popup Events --
let orderTypeBtn = document.getElementById("Order-Type");
let orderTypePopup = document.querySelector(".Type.popup");

let orderStatusBtn = document.querySelector(".filter-item:nth-of-type(4)");
let orderStatusPopup = document.querySelector(".status.popup");

function togglePopup(popupToShow, popupToHide) {
  if (popupToShow.style.display === "block") {
    popupToShow.style.display = "none";
  } else {
    popupToShow.style.display = "block";
    popupToHide.style.display = "none";
  }
}
orderTypeBtn.addEventListener("click", function () {
  togglePopup(orderTypePopup, orderStatusPopup);
});
orderStatusBtn.addEventListener("click", function () {
  togglePopup(orderStatusPopup, orderTypePopup);
});
document.addEventListener("click", function (e) {
  if (!orderTypeBtn.contains(e.target) && !orderTypePopup.contains(e.target)) {
    orderTypePopup.style.display = "none";
  }
  if (!orderStatusBtn.contains(e.target) && !orderStatusPopup.contains(e.target)) {
    orderStatusPopup.style.display = "none";
  }
});


// Event Listeners for status & Type filters
function filtered(property, value) {
  let filtered = allData.filter(el => el[property] === value);
  renderData(filtered);
  orderStatusPopup.style.display = "none";
  orderTypePopup.style.display = "none";
}

// status filters
Completed.addEventListener('click', () => { filtered("status", "Completed") });
InTransit.addEventListener('click', () => { filtered("status", "In Transit") });
Processing.addEventListener('click', () => { filtered("status", "Processing") });
OnHold.addEventListener('click', () => { filtered("status", "On Hold") });
Rejected.addEventListener('click', () => { filtered("status", "Rejected") });
AllStatus.addEventListener('click', function () {
  renderData(allData);
  orderStatusPopup.style.display = "none";
});

// type filter
Grocery.addEventListener('click', () => { filtered("type", "Grocery") });
Medicine.addEventListener('click', () => { filtered("type", "Medicine") });
Electric.addEventListener('click', () => { filtered("type", "Electric") });

// Date filter
search.addEventListener('click', function filteredByDate() {
  if (dateInput.value != "") {
    let filterDate = allData.filter(el => el.date === dateInput.value);
    renderData(filterDate);
    dateInput.value = "";
  }
})

// Reset button
let resetBtn = document.querySelector(".reset-filter");
console.log(resetBtn)
resetBtn.addEventListener("click", function () {
  location.reload();
  renderData(allData);
  console.log("fvgbvgb")
});
