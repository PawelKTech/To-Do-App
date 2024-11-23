document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.querySelector("#addTaskBtn");
  const taskInput = document.querySelector("#taskInput");
  const taskList = document.querySelector("#taskList");

  //Check localStorage
  try {
    if (localStorage.length !== 0) {
      const storedTasks = JSON.parse(localStorage.getItem("taskslist")) || [];
      storedTasks.forEach((element) => {
        taskList.appendChild(addLiEelement(element));
      });
    }
  } catch (error) {
    console.error("Error reading tasks from localStorage:", error);
  }

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    try {
      const storedTasks = JSON.parse(localStorage.getItem("taskslist")) || [];
      if (taskText != "") {
        if (storedTasks.includes(taskText)) {
          alert("To zadanie masz już do zrobienia :)");
          taskInput.value = "";
        } else {
          storedTasks.push(taskText);
          localStorage.setItem("taskslist", JSON.stringify(storedTasks));
          taskList.appendChild(addLiEelement(taskText));
          taskInput.value = "";
        }
      } else {
        alert("Zadanie nie może być puste!");
      }
    } catch (error) {
      console.error("Error saving task to localStorage:", error);
      alert("Wystąpił błąd przy zapisywaniu zadania.");
    }
  });

  taskList.addEventListener("click", (e) => {
    const li = e.target;

    try {
      //delete btn
      if (
        li.classList.contains("delete-btn") ||
        li.classList.contains("delete-icon")
      ) {
        const TaskText = li.closest("li").textContent.trim();
        const storedTasks = JSON.parse(localStorage.getItem("taskslist")) || [];
        const index = storedTasks.indexOf(TaskText);
        storedTasks.splice(index, 1);
        localStorage.setItem("taskslist", JSON.stringify(storedTasks));
        li.closest("li").remove();
      }

      //edit btn
      if (
        li.classList.contains("edit-btn") ||
        li.classList.contains("edit-icon")
      ) {
        let editTaskInput = prompt(
          `Edytujesz zdanie ${li.closest("li").textContent.trim()}: `
        );
        const storedTasks = JSON.parse(localStorage.getItem("taskslist")) || [];
        if (editTaskInput != "" || editTaskInput != null) {
          if (storedTasks.includes(editTaskInput)) {
            alert("To zadanie masz już do zrobienia :)");
          } else {
            const index = storedTasks.indexOf(
              li.closest("li").textContent.trim()
            );
            storedTasks[index] = editTaskInput;
            localStorage.setItem("taskslist", JSON.stringify(storedTasks));
            li.closest(
              "li"
            ).innerHTML = `<span class="ms-1">${editTaskInput}</span>
          <div class="ms-auto">
              <button class="btn btn-danger btn-sm delete-btn"><i class="bi bi-trash delete-icon"></i></button>
              <button class="btn btn-primary btn-sm edit-btn"><i class="bi bi-pencil-square edit-icon"></i></button>
          </div>    `;
          }
        } else {
          alert("Zadanie nie może być puste!");
        }
      }
    } catch (error) {
      console.error("Error saving task to localStorage:", error);
      alert("Wystąpił błąd przy zapisywaniu zadania.");
    }
  });

  function addLiEelement(text) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "text-wrap",
      "align-items-center"
    );
    li.innerHTML = ` <span class="ms-1">${text}</span>
          <div class="ms-auto">
              <button class="btn btn-danger btn-sm delete-btn"><i class="bi bi-trash delete-icon"></i></button>
              <button class="btn btn-primary btn-sm edit-btn"><i class="bi bi-pencil-square edit-icon"></i></button>
          </div>    `;
    return li;
  }
});
