// DATABASE TODO
const dbTodo = [];
const dbDueTime = [];
const dbDone = ["Good Job", "Super", "Cool", "Aweosome", "Nice", "Sucess"];

// AMBIL DATA DARI TODO
document.forms["todo-form"].onsubmit = (event) => {
  event.preventDefault();
  const todo = document.forms["todo-form"]["todo"].value;
  Swal.fire({
    position: "center",
    icon: "success",
    title: `${todo} ditambahkan`,
    showConfirmButton: false,
    timer: 1500,
  });

  dbTodo.push(todo);
  const dueTime = document.forms["todo-form"]["dueTime"].value;
  dbDueTime.push(dueTime);

  console.log(dbTodo);
  console.log(dbDueTime);

  document.forms["todo-form"].reset();
  prosesTodo();
};

// PROSES DATA TODO
function prosesTodo() {
  clearTodo();
  for (let i = 0; i < dbTodo.length; i++) {
    const todo = dbTodo[i];
    const dueTime = dbDueTime[i];

    const search = document.getElementById("search").value.toLowerCase();

    if (todo.toLowerCase().includes(search)) {
      displayTodo(i, todo, dueTime);
    }
  }
}

// HAPUS DATA TODO YANG SAMA
function clearTodo() {
  const tbody = document.getElementById("todo-tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

// DISPLAY DATA TODO
function displayTodo(index, todo, dueTime) {
  let tr = document.createElement("tr");

  let tdTodo = document.createElement("td");
  tdTodo.textContent = todo;
  tr.appendChild(tdTodo);

  let tdDueTime = document.createElement("td");
  tdDueTime.textContent = dueTime;
  tr.appendChild(tdDueTime);

  let tdButton = document.createElement("td");
  let button = document.createElement("button");
  button.textContent = "done";
  button.classList.add("btn");
  button.onclick = function () {
    doneTodo(index);
  };
  tdButton.appendChild(button);
  tr.appendChild(tdButton);

  const tbody = document.getElementById("todo-tbody");
  tbody.appendChild(tr);
}

// RANDOM ALERT DONE
function getRandomDone() {
  return Math.floor(Math.random() * dbDone.length);
}

// FUNGSI DONE TODO
function doneTodo(index) {
  let randomDone = getRandomDone();
  Swal.fire({
    title: "Are you sure?",
    text: "You want to done this todo?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, done it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        `${dbDone[randomDone]}`,
        "Your already done this todo.",
        "success"
      );
      dbTodo.splice(index, 1);
      dbDueTime.splice(index, 1);
      prosesTodo();
    }
  });
}

// FUNGSI SEARCH DATA
const search = document.getElementById("search");
search.onkeydown = function () {
  prosesTodo();
};
search.onkeyup = function () {
  prosesTodo();
};

function checkTodo() {
  const todo = document.getElementById("todo").value;
  let alertInput = document.getElementById("alert-input");
  let number = "1234567890";
  if (todo.length > 30) {
    alertInput.style.display = "block";
  } else {
    alertInput.style.display = "none";
  }
}

const todo = document.getElementById("todo");
todo.onkeyup = function () {
  checkTodo();
};
todo.onkeydown = function () {
  checkTodo();
};
