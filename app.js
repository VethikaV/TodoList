let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
    updateProgress();
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./Images/edit.svg" onClick="editTask(${index})" />
          <img src="./Images/delete.png" onClick="deleteTask(${index})" />
        </div>
      </div>
    `;
    listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateProgress();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
};

const updateProgress = () => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const progress = document.getElementById("progress");
  const numbers = document.getElementById("numbers");

  if (total === 0) {
    progress.style.width = "0%";
    numbers.textContent = "0 / 0";
  } else {
    const percent = (completed / total) * 100;
    progress.style.width = `${percent}%`;
    numbers.textContent = `${completed} / ${total}`;
  }
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
});

// Placeholder for future edit function
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTasksList();
  }
}
