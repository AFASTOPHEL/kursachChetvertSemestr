import { Task } from './Task.js';

export class Board {
    constructor(containerId, onTaskEditRequest) {
        this.container = document.getElementById(containerId);
        this.onTaskEditRequest = onTaskEditRequest;
        this.searchQuery = '';

        this.columns = [
            { id: 'todo', title: 'К выполнению' },
            { id: 'in-progress', title: 'В работе' },
            { id: 'under-review', title: 'На рассмотрении' },
            { id: 'done', title: 'Готово' }
        ];
        this.tasks = [];
    }

    addTask(taskData) {
        const task = new Task(
            taskData.id,
            taskData.title,
            taskData.description,
            taskData.status,
            (data) => this.onTaskEditRequest(data),
            (id) => this.deleteTask(id)
        );
        this.tasks.push(task);
        this.render();
    }

    updateTask(updatedData) {
        const index = this.tasks.findIndex(t => t.id === updatedData.id);
        if (index !== -1) {
            this.tasks[index].title = updatedData.title;
            this.tasks[index].description = updatedData.description;
            this.tasks[index].status = updatedData.status;
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.render();
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase();
        this.render();
    }

    updateTaskStatus(taskId, newStatus) {
        const index = this.tasks.findIndex(t => t.id == taskId);
        if (index !== -1 && this.tasks[index].status !== newStatus) {
            this.tasks[index].status = newStatus;
            this.render();
        }
    }

    render() {
        this.container.innerHTML = '';

        this.columns.forEach(col => {
            const colEl = document.createElement('div');
            colEl.classList.add('column');

            colEl.innerHTML = `
        <div class="column__header">${col.title}</div>
        <div class="column__content" id="${col.id}"></div>
      `;

            const contentContainer = colEl.querySelector('.column__content');

            contentContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                contentContainer.classList.add('drag-over');
            });

            contentContainer.addEventListener('dragleave', () => {
                contentContainer.classList.remove('drag-over');
            });

            contentContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                contentContainer.classList.remove('drag-over');
                const taskId = e.dataTransfer.getData('text/plain');
                if (taskId) {
                    this.updateTaskStatus(taskId, col.id);
                }
            });

            this.container.appendChild(colEl);
        });

        const filteredTasks = this.tasks.filter(task =>
            task.title.toLowerCase().includes(this.searchQuery) ||
            task.description.toLowerCase().includes(this.searchQuery)
        );

        filteredTasks.forEach(task => {
            const taskEl = task.render();
            const targetCol = document.getElementById(task.status);
            if (targetCol) {
                targetCol.appendChild(taskEl);
            }
        });
    }
}