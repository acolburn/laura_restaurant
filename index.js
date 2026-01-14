import { menuArray } from "./data.js";

const menuDiv = document.getElementById("menu");
const totalDiv = document.getElementById("total");
const chargeCardDiv = document.getElementById("charge-card");
const mainDiv = document.getElementById("main");
let orders = [];

document.addEventListener("click", function (event) {
  // This statement selects the + buttons because
  // only + buttons have data-name values
  // so next line truthy only when + button clicked
  if (event.target.dataset.name) {
    const order = menuArray.filter(
      (item) => item.id == event.target.dataset.name
    );
    // order is an array, with one object
    // order[0] identifies the object
    orders.push(order[0]);
    totalDiv.classList.remove("hidden");
  }

  // Can't have normal btnOrder.getEventListener()
  // because btnOrder doesn't exist when page loaded; error thrown
  if (event.target.matches("#btn-order")) {
    mainDiv.style.background = "lightgrey";
    chargeCardDiv.style.display = "flex";
  }

  render();
});

function render() {
  const menuHtml = menuArray
    .map(function (menuItem) {
      return `<div class="menu-row">
        <img src=${menuItem.image} class="menu-img">
        <div class="menu-item-info">
          <div class="menu-item-name">${menuItem.name}</div>
          <div class="menu-item-description">${menuItem.description}</div>
          <div class="menu-item-price">${menuItem.price}</div>
        </div>
        <button class="btn-add" data-name="${menuItem.id}">+</button>
      </div>
      
      `;
    })
    .join("");

  menuDiv.innerHTML = menuHtml;

  totalDiv.innerHTML = `<h1>Your Order</h1>`;
  let orderTotal = 0;

  let yourOrderHtml = orders
    .map(function (orderItem) {
      orderTotal += orderItem.price;
      return `<div class="item-container">
        <div class="item">${orderItem.name} <button class="btn-remove">Remove</button></div>
        
        <div class="price">${orderItem.price}</div>
    </div>`;
    })
    .join("");

  yourOrderHtml += `<hr><div class="item-container"><div class="item">Total price:</div>
  <div class="price">${orderTotal}</div></div>`;

  yourOrderHtml += `<button id="btn-order">Complete Order</button>`;

  totalDiv.innerHTML += yourOrderHtml;
}

render();
