export class ApiService {
  constructor() {
    this.baseUrl = 'https://jsonplaceholder.typicode.com';
  }

  async fetchTasks() {
    try {
      const response = await fetch(`${this.baseUrl}/todos?_limit=4`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }

      const data = await response.json();

      return data.map(item => ({
        id: item.id,
        title: item.title,
        description: 'Задача загружена через REST API',
        status: item.completed ? 'done' : 'todo'
      }));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return [];
    }
  }

  async createTask(taskData) {
    try {
      const response = await fetch(`${this.baseUrl}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Ошибка при создании');
      return await response.json();
    } catch (error) {
      console.error('Ошибка POST запроса:', error);
      throw error;
    }
  }
}