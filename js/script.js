{
  let tasks = [];
  let hideShowTasks = false;

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

  const bindButtonsEvents = () => {
    const switchDoneTasks = document.querySelector(".js-switchDoneTasks");
    const markAllTasksDone = document.querySelector(".js-markAllTasksDone");

    switchDoneTasks?.addEventListener("click", switchTasksDone);
    markAllTasksDone?.addEventListener("click", markDoneAllTasks);
  };

  const switchTasksDone = () => {
    hideShowTasks = !hideShowTasks;
    render();
  };

  const markDoneAllTasks = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
    bindButtonsEvents();
  };

  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
        <li class="${task.done && hideShowTasks ? " taskList__item--hidden" : "taskList__item"}">
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
  };

  const renderButtons = () => {
    const managementButtons = document.querySelector(".js-managementButtons");
    if (tasks.length === 0) {
      managementButtons.innerHTML = "";
      return;
    }
    managementButtons.innerHTML = `
        <button class="taskList__button js-switchDoneTasks">
            ${hideShowTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="taskList__button js-markAllTasksDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newTaskInput = document.querySelector(".js-taskInput");
    const newTaskContent = document.querySelector(".js-taskInput").value.trim();
    if (newTaskContent === "") {
      newTaskInput.focus();
      return;
    } else if (newTaskContent !== "") {
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
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };
}
