"use strict";
const itemNameInput = document.querySelector("#item-name");
const itemQuantityInput = document.querySelector("#item-quantity");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");
const clearAllButton = document.querySelector("#clear-all-button");

itemQuantityInput.addEventListener("change", function (event) {
  const minValue = 1;
  const value = parseInt(this.value);
  if (isNaN(value) || value < minValue) {
    this.value = minValue;
  }
});

function addItem() {
  const itemName = itemNameInput.value.trim();
  const itemQuantity = parseInt(itemQuantityInput.value);
  if (itemName === "") {
    alert("Veuillez entre un nom d'article.");
    return;
  }

  const existingItem = findExistingItem(itemName);
  if (existingItem) {
    updateExistingItemQuantity(existingItem, itemQuantity);
  } else {
    const newItem = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = itemName;

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = itemQuantity;

    const quantityLessButton = document.createElement("button");
    quantityLessButton.textContent = "-";

    const quantityMoreButton = document.createElement("button");
    quantityMoreButton.textContent = "+";

    newItem.appendChild(quantitySpan);
    newItem.appendChild(nameSpan);
    newItem.appendChild(quantityLessButton);
    newItem.appendChild(quantityMoreButton);
    newItem.appendChild(deleteButton);

    document.getElementById("shopping-list").appendChild(newItem);

    addDeleteItem(deleteButton);
    addIncreaseItem(quantityMoreButton, quantitySpan);
    addDecreaseItem(quantityLessButton, quantitySpan);
  }

  itemNameInput.value = "";
  itemQuantityInput.value = 1;

  itemNameInput.focus();
}

function addDeleteItem(deleteButton) {
  deleteButton.addEventListener("click", function (event) {
    this.parentElement.remove();
  });
}

function addDecreaseItem(quantityLessButton, quantitySpan) {
  quantityLessButton.addEventListener("click", function (event) {
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity--;
    if (currentQuantity <= 0) {
      this.parentElement.remove();
    } else {
      quantitySpan.textContent = currentQuantity;
    }
  });
}

function addIncreaseItem(quantityMoreButton, quantitySpan) {
  quantityMoreButton.addEventListener("click", function (event) {
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity++;
    quantitySpan.textContent = currentQuantity;
  });
}

function clearAllItems() {
  shoppingList.innerHTML = "";
}

function findExistingItem(itemName) {
  const items = shoppingList.querySelectorAll("li");
  for (const item of items) {
    const nameSpan = item.querySelector("span:nth-child(2)");
    if (
      nameSpan &&
      nameSpan.textContent.toLowerCase() === itemName.toLowerCase()
    ) {
      return item;
    }
  }
  return null;
}

function updateExistingItemQuantity(item, itemQuantity) {
  const quantitySpan = item.querySelector("span:first-child");
  if (quantitySpan) {
    const currentQuantity = parseInt(quantitySpan.textContent);
    const newQuantity = currentQuantity + itemQuantity;
    quantitySpan.textContent = newQuantity;
  }
}

addButton.addEventListener("click", addItem);
clearAllButton.addEventListener("click", clearAllItems);
