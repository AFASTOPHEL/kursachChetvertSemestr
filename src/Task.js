export class Task {
    constructor(id, title, description, status, onEdit, onDelete) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }

    render() {
        const card = document.createElement('div');
        card.classList.add('task-card');
        card.setAttribute('data-id', this.id);
        card.draggable = true;

        card.innerHTML = `
      <div class="task-card__header">
        <h3 class="task-card__title">${this.title}</h3>
        <div class="task-card__actions">
          <button class="btn-icon btn-edit" title="Редактировать">✏️</button>
          <button class="btn-icon btn-icon--danger btn-delete" title="Удалить">🗑️</button>
        </div>
      </div>
      <div class="task-card__desc">${this.description}</div>
    `;

        const editBtn = card.querySelector('.btn-edit');
        const deleteBtn = card.querySelector('.btn-delete');

        editBtn.addEventListener('click', () => {
            this.onEdit({ id: this.id, title: this.title, description: this.description, status: this.status });
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm('Точно удалить эту задачу?')) {
                this.onDelete(this.id);
            }
        });

        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.id);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        return card;
    }
}