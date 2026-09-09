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

// 1. Create the observer ("The Watcher")
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the element is currently visible on the user's screen
    if (entry.isIntersecting) {
      // Add the .show class (which triggers the CSS fade-in)
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15 // Trigger when 15% of the element is visible
});

// 2. Tell the observer which elements to watch
document.addEventListener('DOMContentLoaded', () => {
  // Find all sections and project cards
  const hiddenElements = document.querySelectorAll('.about-section, .projects-section, .contact-section, .project-card');

  // Loop through each element, make it hidden first,then start watching it
  hiddenElements.forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
  });
});