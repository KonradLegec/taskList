{
  const tasks = [];

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
        <li class = "taskList__item">
            <button class = "js-done taskList__toggleButton">
            ${task.done ? "✔" : ""}
            </button>
            <span class=${
              task.done ? "taskList__contentDone" : "taskList__content"
            }>
            ${task.content}</span>
            <button class = "js-remove taskList__removeButton">🗑</button>
        </li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newTaskInput = document.querySelector(".js-taskInput");
    const newTaskContent = document.querySelector(".js-taskInput").value.trim();
    if (newTaskContent === "") {
      newTaskInput.focus();
      return;
    }

    else if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskInput.value = "";
      newTaskInput.focus();
    }
  };

  const init = () => {
    render();
    const addButton = document.querySelector(".js-form");

    addButton.addEventListener("submit", onFormSubmit);
  };

  init();

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };
}
