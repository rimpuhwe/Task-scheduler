const inputText = document.getElementById("input-text");
const dueDate = document.getElementById("due-date");
const description = document.getElementById("description");
const listContainer = document.getElementById("task-list-items");
const addTaskBtn = document.getElementById("add-task");

function addTask() {
  if (inputText.value === "") {
    alert(" Add atleast one work to be done ");
  } else {
    const tr = document.createElement("tr");
    const title = document.createElement("td");
    title.innerHTML = inputText.value;
    tr.appendChild(title);

    const description = document.createElement("td");
    description.innerHTML = description.value;
    tr.appendChild(description);

    const due = document.createElement("td");
    due.innerHTML = dueDate.value;
    tr.appendChild(due);
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    tr.appendChild(span);

    listContainer.appendChild(tr);
  }
  inputText.value = "";
  dueDate.value = "";
  description.value = "";
  sortTasksByDueDate()
  save();
}

function sortTasksByDueDate() {
  const rows = Array.from(listContainer.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const dateA = new Date(a.cells[2].innerText);
    const dateB = new Date(b.cells[2].innerText);
    return dateA - dateB;
  });
  rows.forEach((row) => listContainer.appendChild(row));
}
function editTask(tr){
  const title = tr.cells[0].innerText
  const description = tr.cells[1].innerText
  const dueDate = tr.cells[2].innerText
  inputText.value = title
  description.value = description
  dueDate.value = dueDate
  save()
}
function save() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showData(){
    listContainer.innerHTML = localStorage.getItem('data');

}
showData();
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "TD") {
      const tr = e.target.parentElement;
      tr.classList.toggle("checked");
      save();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      save();
    }
  },
  false
);

//sorting due dates
addTaskBtn.addEventListener("click", addTask);
