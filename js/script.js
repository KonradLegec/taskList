{
  //"tasks" to tablica przechowująca zadania oraz ich status "done" z wartościami boolean(true/false)
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

  // funkcja "render" generuje zawartość listy ul po modyfikacji jej zawartości
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class = "taskList__item">
            <button class = "js-done taskList__toggleButton">
            ${task.done ? "✔" : ""}
            </button>
            <span class=${task.done ? "taskList__contentDone" : "taskList__content"}>
            ${task.content}</span>
            <button class = "js-remove taskList__removeButton">🗑</button>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
    
  };

  // "onFormSubmit" blokuje wysłanie formularza, pobiera z inputa wartość nowego zadania i pozbawia ją białych znaków oraz sprawdza czy nie jest pusta. Następnie zostaje wywołana funkcja "addNewTask" ze stałą "newTaskContent"
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newTaskContent = document.querySelector(".js-taskInput").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };

  // "init" nasłuchuje submit na formularzu następnie wywołuje funkcję "onFormSubmit"
  const init = () => {
    render();
    const addButton = document.querySelector(".js-form");

    addButton.addEventListener("submit", onFormSubmit);
  };

  init();

  // "addNewTask" dodaje do listy zadań treść nowego zadania przekazanego w referencji w funkcji "onFormSubmit" i wywołuje funkcję "render()"
  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  // "removeTask" usuwa z listy zadań zadanie o wybranym indeksie i wywołuje funkcję render()
  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  //przekreśla wartość zadania po kliknięciu na przycisk "zrobione"
  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const clearInputField = () => {
    let inputText = document.querySelector("js-input");
    inputText.value = "";
  }
}
