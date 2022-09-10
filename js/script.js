{
  //"tasks" to tablica przechowująca zadania oraz ich status "done" z wartościami boolean(true/false)
  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zjeść pierogi",
      done: true,
    },
  ];
  // funkcja "render" generuje zawartość listy ul po modyfikacji jej zawartości
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li ${task.done ? 'style ="text-decoration: line-through"' : ""}>
            ${task.content}<button class= "js-remove">Usuń</button>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      console.log(removeButtons);
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

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

  // "onFormSubmit" blokuje wysłanie formularza, pobiera z inputa wartość nowego zadania i pozbawia ją białych znaków oraz sprawdza czy nie jest pusta. Następnie zostaje wywołana funkcja "addNewTask" ze stałą "newTaskContent"
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };

  // "init" nasłuchuje submit na formularzu następnie wywołuje funkcję "onFormSubmit"
  const init = () => {
    render();
    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
