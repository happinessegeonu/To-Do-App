const STORAGE_KEY = "aurora-todo-tasks";

let tasks = loadTasks();
let currentFilter = "all";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const progressInput = document.getElementById("progressInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const emptyTitle = document.getElementById("emptyTitle");
const emptyMessage = document.getElementById("emptyMessage");
const remainingCount = document.getElementById("remainingCount");
const taskStatus = document.getElementById("taskStatus");
const clearCompletedButton = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");
const toast = document.getElementById("toast");

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not load tasks:", error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(text, details) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text: text.trim(),
    completed: false,
    priority: details.priority,
    dueDate: details.dueDate,
    progress: details.progress,
    createdAt: new Date().toISOString()
  };
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter(task => task.completed);
  }

  return tasks;
}

function render() {
  const visibleTasks = getVisibleTasks();

  taskList.innerHTML = "";

  visibleTasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });

  updateSummary();
  updateEmptyState(visibleTasks.length);
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " completed" : ""}`;
  item.dataset.id = task.id;

  const checkButton = document.createElement("button");
  checkButton.className = "check-btn";
  checkButton.type = "button";
  checkButton.setAttribute(
    "aria-label",
    task.completed ? `Mark "${task.text}" as active` : `Complete "${task.text}"`
  );
  checkButton.addEventListener("click", () => toggleTask(task.id));

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  const details = document.createElement("div");
  details.className = "task-details";
  const priority = task.priority || "medium";
  const priorityLabel = document.createElement("span");
  priorityLabel.className = `priority-badge priority-${priority}`;
  priorityLabel.textContent = `${priority[0].toUpperCase()}${priority.slice(1)} priority`;
  details.appendChild(priorityLabel);

  if (task.dueDate) {
    const dueDate = document.createElement("span");
    dueDate.className = "task-due-date";
    dueDate.textContent = `Due ${new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
    details.appendChild(dueDate);
  }

  if (!task.completed && task.progress === "in-progress") {
    const progress = document.createElement("span");
    progress.className = "progress-badge";
    progress.textContent = "In progress";
    details.appendChild(progress);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.className = "icon-btn";
  editButton.type = "button";
  editButton.setAttribute("aria-label", `Edit "${task.text}"`);
  editButton.textContent = "✎";
  editButton.addEventListener("click", () => startEditing(item, task));

  const deleteButton = document.createElement("button");
  deleteButton.className = "icon-btn delete";
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Delete "${task.text}"`);
  deleteButton.textContent = "×";
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  actions.append(editButton, deleteButton);
  const content = document.createElement("div");
  content.className = "task-content";
  content.append(text, details);
  item.append(checkButton, content, actions);

  return item;
}

function addTask(text) {
  const cleanText = text.trim();

  if (!cleanText) {
    showToast("Please enter a task.");
    taskInput.focus();
    return;
  }

  tasks.unshift(createTask(cleanText, {
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    progress: progressInput.value
  }));
  saveTasks();
  currentFilter = "all";
  updateFilterButtons();
  render();

  taskInput.value = "";
  priorityInput.value = "medium";
  dueDateInput.value = "";
  progressInput.value = "todo";
  taskInput.focus();
  showToast("Task added.");
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
  showToast("Task deleted.");
}

function startEditing(item, task) {
  const text = item.querySelector(".task-text");
  const actions = item.querySelector(".task-actions");

  const input = document.createElement("input");
  input.className = "edit-input";
  input.type = "text";
  input.maxLength = 120;
  input.value = task.text;
  input.setAttribute("aria-label", "Edit task");

  text.replaceWith(input);

  actions.innerHTML = "";

  const saveButton = document.createElement("button");
  saveButton.className = "icon-btn";
  saveButton.type = "button";
  saveButton.setAttribute("aria-label", "Save task");
  saveButton.textContent = "✓";

  const cancelButton = document.createElement("button");
  cancelButton.className = "icon-btn";
  cancelButton.type = "button";
  cancelButton.setAttribute("aria-label", "Cancel editing");
  cancelButton.textContent = "×";

  actions.append(saveButton, cancelButton);
  input.focus();
  input.select();

  const saveEdit = () => {
    const value = input.value.trim();

    if (!value) {
      showToast("A task cannot be empty.");
      input.focus();
      return;
    }

    tasks = tasks.map(currentTask =>
      currentTask.id === task.id
        ? { ...currentTask, text: value }
        : currentTask
    );

    saveTasks();
    render();
    showToast("Task updated.");
  };

  saveButton.addEventListener("click", saveEdit);
  cancelButton.addEventListener("click", render);

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") saveEdit();
    if (event.key === "Escape") render();
  });
}

function setFilter(filter) {
  currentFilter = filter;
  updateFilterButtons();
  render();
}

function updateFilterButtons() {
  filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });
}

function updateSummary() {
  const remaining = tasks.filter(task => !task.completed).length;
  const total = tasks.length;

  remainingCount.textContent = remaining;

  if (total === 1) {
    taskStatus.textContent = "1 task";
  } else {
    taskStatus.textContent = `${total} tasks`;
  }
}

function updateEmptyState(count) {
  const hasTasks = tasks.length > 0;

  taskList.hidden = count === 0;
  emptyState.hidden = count !== 0;

  if (count > 0) return;

  if (!hasTasks) {
    emptyTitle.textContent = "Nothing here yet";
    emptyMessage.textContent = "Add your first task and make today count.";
    return;
  }

  if (currentFilter === "active") {
    emptyTitle.textContent = "All done!";
    emptyMessage.textContent = "You have no active tasks.";
    return;
  }

  emptyTitle.textContent = "No completed tasks";
  emptyMessage.textContent = "Complete a task and it will appear here.";
}

function clearCompleted() {
  const completedCount = tasks.filter(task => task.completed).length;

  if (!completedCount) {
    showToast("There are no completed tasks.");
    return;
  }

  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  render();
  showToast(`${completedCount} completed task${completedCount === 1 ? "" : "s"} cleared.`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  addTask(taskInput.value);
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

clearCompletedButton.addEventListener("click", clearCompleted);

render();
