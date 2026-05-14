export class TeamSettings {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.team = [
      { id: Date.now(), name: 'Иван Иванов (Ты)', role: 'admin' },
      { id: Date.now() + 1, name: 'Алексей Смирнов', role: 'editor' },
      { id: Date.now() + 2, name: 'Елена Валуева', role: 'viewer' }
    ];
  }

  addMember(name, role) {
    if (!name.trim()) return;
    this.team.push({
      id: Date.now(),
      name: name,
      role: role
    });
    this.render();
  }

  removeMember(id) {
    this.team = this.team.filter(member => member.id !== id);
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="team-settings__header">
        <h2>Управление командой</h2>
        <p>Добавляйте участников и назначайте им роли.</p>
      </div>

      <form class="team-form" id="add-member-form">
        <input type="text" id="new-member-name" class="team-form__input" placeholder="Имя участника" required>
        <select id="new-member-role" class="team-form__select">
          <option value="admin">Админ</option>
          <option value="editor" selected>Редактор</option>
          <option value="viewer">Наблюдатель</option>
        </select>
        <button type="submit" class="btn btn--primary">Добавить</button>
      </form>

      <ul class="team-list">
        ${this.team.map(member => `
          <li class="team-member">
            <div class="team-member__info">
              <div class="avatar">${member.name.charAt(0)}</div>
              <span class="team-member__name">${member.name}</span>
              <span class="team-member__role team-member__role--${member.role}">
                ${this.translateRole(member.role)}
              </span>
            </div>
            <button class="btn-remove" data-id="${member.id}">Исключить</button>
          </li>
        `).join('')}
      </ul>
    `;

    this.attachEvents();
  }

  translateRole(role) {
    const roles = { admin: 'Админ', editor: 'Редактор', viewer: 'Наблюдатель' };
    return roles[role] || role;
  }

  attachEvents() {
    const form = this.container.querySelector('#add-member-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = this.container.querySelector('#new-member-name').value;
      const roleInput = this.container.querySelector('#new-member-role').value;
      this.addMember(nameInput, roleInput);
    });

    const removeBtns = this.container.querySelectorAll('.btn-remove');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        this.removeMember(id);
      });
    });
  }
}