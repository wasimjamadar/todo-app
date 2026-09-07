document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Load existing tasks from storage on page load
    loadTasks();

    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        createTaskElement(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = '';
    });

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${taskText}</span>
          <button class="delete-btn">Delete</button>
        `;

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            removeTaskFromLocalStorage(taskText);
        });

        taskList.appendChild(li);
    }

    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function saveTaskToLocalStorage(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => createTaskElement(task));
    }

    function removeTaskFromLocalStorage(taskToDelete) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task !== taskToDelete);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});