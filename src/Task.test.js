import { Task } from './Task.js';

describe('Класс Task (Юнит-тестирование компонентов)', () => {
  it('Должен корректно инициализировать свойства задачи', () => {
    const task = new Task(1, 'Тест', 'Описание теста', 'todo', null, null);

    expect(task.id).toBe(1);
    expect(task.title).toBe('Тест');
    expect(task.description).toBe('Описание теста');
    expect(task.status).toBe('todo');
  });

  it('Должен рендерить HTML элемент карточки с правильными данными', () => {
    const task = new Task(2, 'Сверстать хедер', 'Использовать flexbox', 'in-progress', null, null);

    const cardElement = task.render();

    expect(cardElement.classList.contains('task-card')).toBe(true);
    expect(cardElement.getAttribute('data-id')).toBe("2");
    expect(cardElement.innerHTML).toContain('Сверстать хедер');
    expect(cardElement.innerHTML).toContain('Использовать flexbox');
  });
});