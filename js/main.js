let form = document.querySelector("form");
let input = document.querySelector("#txtTaskName");
let btnDeleteAll = document.querySelector("#btnDeleteAll");
let taskList = document.querySelector("#task-list");
let items;
//callEventListener
eventListener();

//load items
function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {});
}
//submit event
function eventListener() {
  form.addEventListener("submit", addNewItem);
  // delete an item
  taskList.addEventListener("click", deleteItem);
  //delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}
//get items from Local Storage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}
//set item to local storage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}
//delete item from local storage
function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
//create item
function createItem(text) {
  //create li
  var li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));
  //create a
  var a = document.createElement("a");
  a.classList = "delete-item";
  a.setAttribute("href", "#");
  a.style = "float:right;";
  a.innerHTML = '<i class="fas fa-times"></i>';
  //add a to li
  li.appendChild(a);
  //add li to ul
  taskList.appendChild(li);
}
//add new item
function addNewItem(e) {
  e.preventDefault();

  if (input.value === "") {
    alert("add new item");
  }
  //create item
  createItem(input.value);

  //save to local storage
  setItemToLS(input.value);

  //clear input
  input.value = "";
}
//delete an item
function deleteItem(e) {
  e.preventDefault();
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();

    //delete item from local storage
    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
  }
}
//delete all items
function deleteAllItems(e) {
  e.preventDefault();
  if (confirm("are you sure ?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
}
