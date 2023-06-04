$(document).ready(onReady);

function onReady() {
  // console.log("I'm ready"); GOOD

  // GET toDoList database and render on DOM
  getAndRenderTasks();
  $("#add-button").on("click", createTask);
  $("#new-tasks").on("click", ".completeButton", updateTask);
  $("#new-tasks").on("click", ".deleteButton", deleteTask);
}
///////////////////////////////////

// 1ST STEP HERE
function createTask(event) {
  event.preventDefault();

  // console.log("it's working"); GOOD
  let newTask = $("#task-input").val();

  $.ajax({
    method: "POST",
    url: "/task",
    data: {
      task: newTask,
    },
  }).then(function (response) {
    console.log("Task added");
    $("#task-in").val("");
    getAndRenderTasks(); //WILL LEAD TO GET.
  });
}
///////////////////////////////////

// 2ND STEP HERE
function getAndRenderTasks() {
  // Ask server for the array of objects
  $.ajax({
    method: "GET",
    url: "/task",
  }).then(function (response) {
    console.log("response:", response);

    // Render tasks
    $("#new-tasks").empty();
    for (let task of response) {
      $("#new-tasks").append(`
      <tr data-id=${task.id}>
        <th class="unbold">${task.tasks} is</th> 
        <th><button class="completeButton">Complete</button>
        <button class="deleteButton">❌</button></th>
      </tr>
    `); // COMBACK LATER FOR IF STATEMENT.
    }
  });
}

///////////////////////////////////

// 3RD STEP HERE
function deleteTask() {
  // Create variable to delete <li></li> line with data-id.
  let idToDelete = $(this).parent().parent().data("id");

  // CHANGE TEXT AND BACKGROUND COLOR TO NORMAL
  document.body.style.color = "black";
  document.body.style.backgroundColor = "white";

  $.ajax({
    method: "DELETE",
    url: `/task/${idToDelete}`,
    data: "id",
  })
    .then(function (response) {
      // 2. When response comes back, run getAndRenderTasks
      //    to bring DOM back in sync with data.
      //    (AKA: The toDoList table in database.)
      getAndRenderTasks();
    })
    .catch(function (error) {
      alert("client DELETE failure");
    });
}

///////////////////////////////////

// 4TH STEP HERE
function updateTask() {
  let idToUpdate = $(this).parent().parent().data("id");

  // CHANGE TEXT AND BODY BACKGROUND TO RANDOM COLOR
  document.body.style.color = randomColors();
  document.body.style.backgroundColor = randomColors();
  function randomColors() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  $.ajax({
    method: "PUT",
    url: `/task/${idToUpdate}`,
    data: {
      completion: "TRUE",
    },
  })
    .then(function (response) {
      getAndRenderTasks();
    })
    .catch(function (error) {
      console.log("Client Update Failure", error);
    });
}
