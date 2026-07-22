const input = document.querySelector(".input-container input");
const addBtn = document.querySelector(".input-container button");
const taskList = document.querySelector(".task-list");
const emptyMessage = document.querySelector(".empty-message");
const itemsLeft = document.querySelector(".footer span");

const allBtn = document.querySelector("#all-btn");
const activeBtn = document.querySelector("#active-btn");
const completedBtn = document.querySelector("#completed-btn");

let currentFilter = "all";

function updateEmptyMessage() {
    if (taskList.children.length > 0) {
        emptyMessage.style.display = "none";
    } else {
        emptyMessage.style.display = "block";
    }

    let itemsLeftCounter = 0;
    for (const task of taskList.children) {
        if (!task.classList.contains("completed")) {
            itemsLeftCounter++;
        }
    }
    itemsLeft.textContent = `${itemsLeftCounter} items left`;
}

function filterTasks(filter, clickedButton) {

    currentFilter = filter;

    allBtn.classList.remove("pressed");
    activeBtn.classList.remove("pressed");
    completedBtn.classList.remove("pressed");

    clickedButton.classList.add("pressed");

    for (const task of taskList.children) {

        if (filter === "all") {
            task.style.display = "flex";
        }

        else if (filter === "active") {
            if (!task.classList.contains("completed")) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        }

        else if (filter === "completed") {
            if (task.classList.contains("completed")) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        }
    }
}

allBtn.addEventListener("click", () => {
    filterTasks("all", allBtn);
});

activeBtn.addEventListener("click", () => {
    filterTasks("active", activeBtn);
});

completedBtn.addEventListener("click", () => {
    filterTasks("completed", completedBtn);
});
function saveTasks() {

    const tasks = [];

    for (const task of taskList.children) {

        const taskObject = {
            text: task.firstChild.textContent,
            completed: task.classList.contains("completed")
        };

        tasks.push(taskObject);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {

    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!savedTasks) {
        return;
    }

    for (const task of savedTasks) {

        const taskItem = document.createElement("li");
        const deleteBtn = document.createElement("button");

        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");

            updateEmptyMessage();
            filterTasks(currentFilter, document.querySelector(".pressed"));
            saveTasks();
        });

        deleteBtn.textContent = "🗑";

        deleteBtn.addEventListener("click", (event) => {

            taskItem.remove();

            updateEmptyMessage();
            filterTasks(currentFilter, document.querySelector(".pressed"));
            saveTasks();
        });

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }

    updateEmptyMessage();
    filterTasks("all", allBtn);
}
function addTask() {

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    const taskItem = document.createElement("li");

    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        filterTasks(currentFilter, document.querySelector(".pressed"));
        updateEmptyMessage();
        saveTasks();
    });

    const deleteBtn = document.createElement("button");

    taskItem.textContent = task;

    taskList.appendChild(taskItem);

    deleteBtn.textContent = "🗑";

    deleteBtn.addEventListener("click", (event) => {
        event.target.parentElement.remove();

        updateEmptyMessage();

        filterTasks(currentFilter, document.querySelector(".pressed"));
        saveTasks();
    });

    taskItem.appendChild(deleteBtn);

    input.value = "";

    updateEmptyMessage();

    filterTasks(currentFilter, document.querySelector(".pressed"));
    saveTasks();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Default filter when page loads
filterTasks("all", allBtn);
loadTasks();