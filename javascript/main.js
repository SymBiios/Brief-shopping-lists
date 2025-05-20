"use strict";
const itemNameInput = document.querySelector("#item-name");
const itemQuantityInput = document.querySelector("#item-quantity");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");
const clearAllButton = document.querySelector("#clear-all-button");
const countItem = 0;

function addItem() {
  const newItem = document.createElement("li");
  newItem.textContent = `${itemNameInput.value}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";

  newItem.appendChild(deleteButton);
  document.getElementById("shopping-list").appendChild(newItem);

  deleteButton.addEventListener("click", function (event) {
    this.parentElement.remove();
  });
}

function clearAllItems() {
  shoppingList.innerHTML = "";
}

function increaseQuantity() {}

function decreaseQuantity() {}

addButton.addEventListener("click", addItem);
clearAllButton.addEventListener("click", clearAllItems);

console.log(shoppingList);
