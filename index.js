import { menuArray } from "./data.js";

const menuDiv = document.getElementById("menu");
const totalDiv = document.getElementById("total");
const chargeCardDiv = document.getElementById("charge-card-container");
const mainDiv = document.getElementById("main");
let orders = [];

document.addEventListener("click", function (event) {
  // This statement selects the + buttons because
  // only + buttons have data-name values
  // so line truthy only when + button clicked
  if (event.target.dataset.name) {
    addItem(event.target.dataset.name);
  }

  // Can't have normal btnOrder.getEventListener()
  // because btnOrder doesn't exist when page loaded; error thrown
  if (event.target.matches("#btn-order")) {
    btnPlaceOrderClick();
  }

  // This statement selects the Remove buttons because
  // only Remove buttons have data-name-remove values
  // so line truthy only when button clicked
  if (event.target.dataset.nameRemove) {
    removeItem(event.target.dataset.nameRemove);
  }

  render();
});

function addItem(itemClicked) {
  const order = menuArray.filter((item) => item.id == itemClicked);
  // order is an array, with one object
  // order[0] identifies the object
  orders.push(order[0]);
  totalDiv.classList.remove("hidden");
}

function removeItem(itemClicked) {
  const order = orders.filter((order) => order.id == itemClicked);
  // order is an array with one object
  const orderToRemove = order[0];
  // find the item in orders, remove it
  const i = orders.indexOf(orderToRemove);
  if (i > -1) {
    orders.splice(i, 1);
  }
}

function btnPlaceOrderClick() {
  mainDiv.style.background = "lightgrey";
  chargeCardDiv.style.display = "flex";
}

function render() {
  const menuHtml = menuArray
    .map(function (menuItem) {
      const { name, image, description, price, id } = menuItem;
      return `<div class="menu-row">
        <img src=${image} class="menu-img">
        <div class="menu-item-info">
          <div class="menu-item-name">${name}</div>
          <div class="menu-item-description">${description}</div>
          <div class="menu-item-price">${price}</div>
        </div>
        <button class="btn-add" data-name="${id}">+</button>
      </div>
      
      `;
    })
    .join("");

  menuDiv.innerHTML = menuHtml;

  totalDiv.innerHTML = `<h1>Your Order</h1>`;
  let orderTotal = 0;

  let yourOrderHtml = orders
    .map(function (orderItem) {
      const { name, image, description, price, id } = orderItem;
      orderTotal += price;
      return `<div class="item-container">
        <div class="item">${name} 
        <button id="btn-remove" data-name-remove="${id}">Remove</button>
        </div>
        
        <div class="price">${price}</div>
    </div>`;
    })
    .join("");

  yourOrderHtml += `<hr><div class="item-container"><div class="item">Total price:</div>
  <div class="price">${orderTotal}</div></div>`;

  yourOrderHtml += `<button id="btn-order">Complete Order</button>`;

  totalDiv.innerHTML += yourOrderHtml;
}

render();
