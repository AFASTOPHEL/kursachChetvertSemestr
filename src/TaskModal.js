export class TaskModal {
  constructor(modalId, onTaskSave) {
    this.modal = document.getElementById(modalId);
    this.onTaskSave = onTaskSave;

    this.form = this.modal.querySelector('#new-task-form');
    this.closeBtn = this.modal.querySelector('#close-modal-btn');
    this.titleEl = this.modal.querySelector('#modal-title');
    this.submitBtn = this.modal.querySelector('#modal-submit-btn');

    this.editingTaskId = null;

    this.attachEvents();
  }

  open(task = null) {
    this.editingTaskId = task ? task.id : null;

    if (task) {
      this.titleEl.textContent = 'Редактировать задачу';
      this.submitBtn.textContent = 'Сохранить изменения';
      this.form.querySelector('#task-title').value = task.title;
      this.form.querySelector('#task-desc').value = task.description;
      this.form.querySelector('#task-status').value = task.status;
    } else {
      this.titleEl.textContent = 'Новая задача';
      this.submitBtn.textContent = 'Создать задачу';
      this.form.reset();
    }

    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.style.display = 'none';
    this.form.reset();
    this.editingTaskId = null;
  }

  attachEvents() {
    this.closeBtn.addEventListener('click', () => this.close());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = this.form.querySelector('#task-title').value;
      const desc = this.form.querySelector('#task-desc').value;
      const status = this.form.querySelector('#task-status').value;

      const taskData = {
        id: this.editingTaskId || Date.now(),
        title: title,
        description: desc,
        status: status
      };

      if (this.onTaskSave) {
        this.onTaskSave(taskData);
      }

      this.close();
    });
  }
}