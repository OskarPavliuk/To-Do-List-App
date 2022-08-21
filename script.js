// Search and return the first element in the document in the specified selector.
var input = document.querySelector('#input');
var list = document.querySelector('#list');
var addTask = document.querySelector('#add');

// Get the element by its identifier and add a certain event.
document.getElementById("add").addEventListener("click", add);
document.getElementById("del").addEventListener("click", del);
document.getElementById("edit").addEventListener("clcik", edit);

// we add a certain event, which is responsible for ensuring that
// when input is entered, the input field remains empty in the future.
addTask.addEventListener('click', function () {
  if (input.value === '') return
  saveLocalTodos(input.value);
  input.value = ''
})

// This is the function responsible for adding items to our task list.
function add() {
  var li = document.createElement("li");
  var rubbisch = document.createElement("i");
  var icon = document.createElement("i");
  li.style.color = "black";
  list.appendChild(li);
  li.textContent = input.value;
  icon.className = "icon"
  rubbisch.className = "rubbisch";
  // This event is responsible for the fact that when we click on the check mark,
  // it changes its color to green so that we can distinguish completed tasks from uncompleted tasks.
  icon.addEventListener("click", () => {
    icon.style.color = "limegreen";
  })
  // This event is responsible for the fact that when we click on the cross, our task is deleted.
  rubbisch.addEventListener("click", () => {
    li.remove();
  })
  li.appendChild(icon);
  li.appendChild(rubbisch);
}

// This function deletes the first item in our list if we click on the delete button.
function del() {
  document.getElementById("list");
  removeLocalTodos(list);
  list.removeChild(list.firstElementChild);
}


// This is a feature that keeps our list in the browser application even when the page is reloaded.
function saveLocalTodos(li) {
  let lis;
  if (localStorage.getItem('lis') === null) {
    // 
    lis = [];
  } else {
    lis = JSON.parse(localStorage.getItem('lis'));
  }
  lis.push(li);
  localStorage.setItem('lis', JSON.stringify(lis));
}

// This is a function that deletes our list in the browser application, even when the page is reloaded.
function removeLocalTodos(li) {
  let lis;
  let completedlis;
  if (localStorage.getItem('lis') === null) {
    lis = [];
  } else {
    lis = JSON.parse(localStorage.getItem('lis'));
  }
  if (localStorage.getItem('completedlis') === null) {
    completedlis = [];
  } else {
    completedlis = JSON.parse(localStorage.getItem('completedlis'));
  }
  const todoElement = li.children[0].innerText;
  if (completedlis.includes(todoElement)) {
    completedlis.splice(completedlis.indexOf(todoElement), 1);
    localStorage.setItem('completedlis', JSON.stringify(completedlis));
  } else {
    lis.splice(lis.indexOf(todoElement), 1);
    localStorage.setItem('lis', JSON.stringify(lis));
  }
}

var items = document.querySelectorAll("#list"),
  input = document.getElementById("input"),
  tab = [], index;
// We fill our array tab with the values of our li.
for (var i = 0; i < items.length; i++) {
  tab.push(items[i].innerHTML);
}
// We get the value we selected, which will be displayed as "new value..." in the text field.
for (var i = 0; i < items.length; i++) {
  items[i].onclick = function () {
    input.value = "new value ...";
    index = tab.indexOf(this.innerHTML);
  };
}

// A function that replaces our li value with the next value we enter.
function edit() {
  items[index].innerHTML = input.value;
}




