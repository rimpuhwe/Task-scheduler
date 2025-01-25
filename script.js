const inputText = document.getElementById("input-text");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const listContainer = document.getElementById("task-list-items");
const addTaskBtn = document.getElementById("add-task");
const resetBtn = document.getElementById("reset-btn");
const saveBtn = document.getElementById("save-btn");

function addTask() {
  if (inputText.value === "") {
    alert("please add atleast one Task , to continue");
  } else {
    const tr = document.createElement("tr");
    const title = document.createElement("td");
    title.innerHTML = inputText.value;
    tr.appendChild(title);

    const descriptionData = document.createElement("td");
    descriptionData.innerHTML = description.value;
    tr.appendChild(descriptionData);

    const dueDateData = document.createElement("td");
    dueDateData.innerHTML = dueDate.value;
    tr.appendChild(dueDateData);

    const span = document.createElement("span");
    span.innerHTML = `
    <button id="edit-button" onclick="editTask(this)">Edit</button>
    <button id="delete-button" onclick="deleteTask(this)">Delete</button>
    `;
    tr.appendChild(span);

    listContainer.appendChild(tr);
    resetBtn.style.display = "block";
  }
  inputText.value = "";
  description.value = "";
  dueDate.value = "";
  sortOutDatesByDue();
  save();
}

function editTask(button) {
  const tr = button.parentElement.parentElement;
  const title = tr.cells[0].innerHTML;
  const descriptionData = tr.cells[1].innerHTML;
  const dueDateData = tr.cells[2].innerHTML;
  inputText.value = title;
  description.value = descriptionData;
  dueDate.value = dueDateData;
  saveBtn.style.display = "block";
  

  save();
}
function deleteTask(button){
  const tr = button.parentElement.parentElement;
  listContainer.removeChild(tr);
  save();
  sortOutDatesByDue();

}
function sortOutDatesByDue() {
  const rows = Array.from(listContainer.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const dateA = new Date(a.cells[2].innerText);
    const dateB = new Date(b.cells[2].innerText);
    return dateA - dateB;
  });
  rows.forEach((row) => listContainer.appendChild(row));
}

function save() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showData();
addTaskBtn.addEventListener("click", addTask);
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("data");
  listContainer.innerHTML = "";
  resetBtn.style.display = "none";
});
