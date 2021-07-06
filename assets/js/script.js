let taskIdCounter = 0;

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do")
let tasksInProgressEl = document.querySelector('#tasks-in-progress');
let tasksCompletedEl = document.querySelector('#tasks-completed');
let pageContentEl = document.querySelector('#page-content')

let tasks = [
    
        
];

let taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (taskNameInput === '' || taskTypeInput === '') {
        alert('you need to fill out the task form!');
        return false;
    };

    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0
    
    let isEdit = formEl.hasAttribute('data-task-id');

    if (isEdit) {
        let taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: 'to do'
        };

        createTaskEl(taskDataObj); 
    };
};


let createTaskEl = function(taskDataObj) {

    let listItemEl = document.createElement("li");
    listItemEl.className = 'task-item';
    listItemEl.setAttribute('data-task-id', taskIdCounter);

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name +"</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);
    
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
};


let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    let deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name','status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ['To Do', 'In Progress', 'Completed'];

    for (let i=0; i<statusChoices.length; i++) {
        let statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);
        
        statusSelectEl.appendChild(statusOptionEl);
    }
    
    
    return actionContainerEl;
};

let completeEditTask = function(taskName, taskType, taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("spam.task-type").textContent = taskType;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            task[i].name = taskName;
            task[i].type = taskType;
        }
    };

    alert('Task Updated!');

    formEl.removeAttribute('data-task-id');

    formEl.querySelector('#save-task').textContent = 'Add Task';
}

let taskButtonHandler = function(event) {
    let targetEl = event.target

    if (targetEl.matches('.edit-btn')) {
        console.log('edit', targetEl);
        let taskId = event.target.getAttribute('data-task-id');
        editTask(taskId);
    }

    else if (targetEl.matches('.delete-btn')) {
        console.log('delete', targetEl);
        let taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }
};

let taskStatusChangeHandler = function(event) {
    console.log(event.target.value);

    let taskId = event.target.getAttribute('data-task-id');

    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    let statusValue = event.target.value.toLowerCase();
    
    if (statusValue === 'to do') {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === 'in progress') {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === 'completed') {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for (let i = 0; i <tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    };
    console.log(tasks);
};

let editTask = function(taskId) {
    console.log(taskId);

    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskId);

    let taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType)
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("input[name='task-type']").value = taskType;
    
    formEl.setAttribute("data-task-id", taskId);

    formEl.querySelector("#save-task").textContent = "Save Task"
};

// var editTask = function(taskId) {
//     console.log(taskId);
  
//     // get task list item element
//     var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
//     // get content from task name and type
//     var taskName = taskSelected.querySelector("h3.task-name").textContent;
//     console.log(taskName);
  
//     var taskType = taskSelected.querySelector("span.task-type").textContent;
//     console.log(taskType);
  
//     // write values of taskName and taskType to form to be edited
//     document.querySelector("input[name='task-name']").value = taskName;
//     document.querySelector("select[name='task-type']").value = taskType;
  
//     // set data attribute to the form with a value of the task's id so it knows which one is being edited
//     formEl.setAttribute("data-task-id", taskId);
//     // update form's button to reflect editing a task rather than creating a new one
//     formEl.querySelector("#save-task").textContent = "Save Task";
//   };
  


let deleteTask = function(taskId) {
    console.log(taskId);
    
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    let updatedTaskArray = [];

    for (let i = 0; i <tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArray.push(tasks[i]);
        }
    };

    tasks = updatedTaskArray;

};


formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener('click', taskButtonHandler);

pageContentEl.addEventListener('change', taskStatusChangeHandler);