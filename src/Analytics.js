export class Analytics {
  constructor(containerId) {
    this.container = document.getElementById(containerId);

    this.stats = {
      totalTasks: 42,
      completedTasks: 28,
      activeMembers: 3,
      productivity: 66
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="analytics__header">
        <h2>Аналитика проекта</h2>
        <p>Сводная статистика по задачам и эффективности команды.</p>
      </div>

      <div class="analytics__grid">
        <div class="stat-card">
          <span class="stat-card__title">Всего задач</span>
          <span class="stat-card__value">${this.stats.totalTasks}</span>
        </div>
        
        <div class="stat-card">
          <span class="stat-card__title">Завершено</span>
          <span class="stat-card__value" style="color: #36b37e;">${this.stats.completedTasks}</span>
        </div>
        
        <div class="stat-card">
          <span class="stat-card__title">Участников</span>
          <span class="stat-card__value">${this.stats.activeMembers}</span>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-card__title">Общая продуктивность (${this.stats.productivity}%)</span>
        <div class="progress-bar">
          <div class="progress-bar__fill" style="width: ${this.stats.productivity}%;"></div>
        </div>
      </div>
    `;
  }
}