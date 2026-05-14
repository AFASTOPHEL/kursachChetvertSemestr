import { Board } from './Board.js';
import { Sidebar } from './Sidebar.js';
import { TeamSettings } from './TeamSettings.js';
import { Analytics } from './Analytics.js';
import { TaskModal } from './TaskModal.js';
import { ApiService } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  let kanbanBoard;
  const api = new ApiService();

  const taskModal = new TaskModal('task-modal', async (taskData) => {
    const exists = kanbanBoard.tasks.some(t => t.id === taskData.id);
    if (exists) {
      kanbanBoard.updateTask(taskData);
    } else {
      try {
        await api.createTask(taskData);
        kanbanBoard.addTask(taskData);
      } catch (e) {
        alert('Не удалось создать задачу на сервере');
      }
    }
  });

  kanbanBoard = new Board('kanban-board', (taskData) => {
    taskModal.open(taskData);
  });

  const teamSettings = new TeamSettings('team-settings');
  const analytics = new Analytics('analytics-panel');

  const boardContainer = document.getElementById('kanban-board');
  const settingsContainer = document.getElementById('team-settings');
  const analyticsContainer = document.getElementById('analytics-panel');

  const sidebar = new Sidebar('.nav', (sectionId) => {
    boardContainer.style.display = 'none';
    settingsContainer.style.display = 'none';
    analyticsContainer.style.display = 'none';

    if (sectionId === 'board') {
      boardContainer.style.display = 'flex';
      kanbanBoard.render();
    } else if (sectionId === 'settings') {
      settingsContainer.style.display = 'block';
      teamSettings.render();
    } else if (sectionId === 'analytics') {
      analyticsContainer.style.display = 'block';
      analytics.render();
    }
  });

  sidebar.render();
  boardContainer.style.display = 'flex';

  boardContainer.innerHTML = '<p style="padding: 2rem;">Загрузка задач с сервера...</p>';
  const serverTasks = await api.fetchTasks();

  kanbanBoard.tasks = [];
  kanbanBoard.render();

  serverTasks.forEach(task => {
    kanbanBoard.addTask(task);
  });

  document.getElementById('add-task-btn').addEventListener('click', () => {
    taskModal.open();
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      kanbanBoard.setSearchQuery(e.target.value);
    });
  }
});