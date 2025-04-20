window.addEventListener('load', function () {
  let table = this.document.querySelector("table tbody");

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);
  xhr.send();

  xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);

          res.map((obj) => {
              let j = `
          <tr>
            <td>${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.address}</td>
            <td>${obj.date}</td>
            <td>${obj.type}</td>
            <td><span id="status-${obj.id}" class="status">${obj.status}</span></td>
          </tr>
        `;
              table.insertAdjacentHTML("beforeend", j);

              let Status = document.getElementById(`status-${obj.id}`);

              switch (obj.status) {
                  case "Completed":
                      Status.style.backgroundColor = "#CCF0EB";
                      Status.style.color = "#00B69B";
                      break;
                  case "In Transit":
                      Status.style.backgroundColor = "#ffa3d7";
                      Status.style.color = "#BA29FF";
                      break;
                  case "Processing":
                      Status.style.backgroundColor = "#E0D4FC";
                      Status.style.color = "#6226EF";
                      break;
                  case "On Hold":
                      Status.style.backgroundColor = "#FFEDDD";
                      Status.style.color = "#FFA95A";
                      break;
                  case "Rejected":
                      Status.style.backgroundColor = "#FCD7D4";
                      Status.style.color = "#F25F51";
                      break;
                  default:
                      Status.style.backgroundColor = "#ddd";
              }
          });
      }
  });
});

let ApplyType =document.getElementById("Apply-Type");
let ApplyStatus =document.getElementById("Apply-Status");

// ApplyType.addEventListener('click',function(){

// //   if()
// // })

console.log(ApplyType,ApplyStatus)

// -- Popup Events -- 
let orderTypeBtn = document.getElementById("Order-Type");
let orderTypePopup = document.querySelector(".Type.popup");

let orderStatusBtn = document.querySelector(".filter-item:nth-of-type(4)");
let orderStatusPopup = document.querySelector(".status.popup");
console.log( orderTypeBtn,orderTypePopup,orderStatusPopup,orderStatusBtn);

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
