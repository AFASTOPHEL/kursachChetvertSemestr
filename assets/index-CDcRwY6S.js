(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e,t,n,r,i,a){this.id=e,this.title=t,this.description=n,this.status=r,this.onEdit=i,this.onDelete=a}render(){let e=document.createElement(`div`);e.classList.add(`task-card`),e.setAttribute(`data-id`,this.id),e.draggable=!0,e.innerHTML=`
      <div class="task-card__header">
        <h3 class="task-card__title">${this.title}</h3>
        <div class="task-card__actions">
          <button class="btn-icon btn-edit" title="Редактировать">✏️</button>
          <button class="btn-icon btn-icon--danger btn-delete" title="Удалить">🗑️</button>
        </div>
      </div>
      <div class="task-card__desc">${this.description}</div>
    `;let t=e.querySelector(`.btn-edit`),n=e.querySelector(`.btn-delete`);return t.addEventListener(`click`,()=>{this.onEdit({id:this.id,title:this.title,description:this.description,status:this.status})}),n.addEventListener(`click`,()=>{confirm(`Точно удалить эту задачу?`)&&this.onDelete(this.id)}),e.addEventListener(`dragstart`,t=>{e.classList.add(`dragging`),t.dataTransfer.setData(`text/plain`,this.id)}),e.addEventListener(`dragend`,()=>{e.classList.remove(`dragging`)}),e}},t=class{constructor(e,t){this.container=document.getElementById(e),this.onTaskEditRequest=t,this.searchQuery=``,this.columns=[{id:`todo`,title:`К выполнению`},{id:`in-progress`,title:`В работе`},{id:`under-review`,title:`На рассмотрении`},{id:`done`,title:`Готово`}],this.tasks=[]}addTask(t){let n=new e(t.id,t.title,t.description,t.status,e=>this.onTaskEditRequest(e),e=>this.deleteTask(e));this.tasks.push(n),this.render()}updateTask(e){let t=this.tasks.findIndex(t=>t.id===e.id);t!==-1&&(this.tasks[t].title=e.title,this.tasks[t].description=e.description,this.tasks[t].status=e.status,this.render())}deleteTask(e){this.tasks=this.tasks.filter(t=>t.id!==e),this.render()}setSearchQuery(e){this.searchQuery=e.toLowerCase(),this.render()}updateTaskStatus(e,t){let n=this.tasks.findIndex(t=>t.id==e);n!==-1&&this.tasks[n].status!==t&&(this.tasks[n].status=t,this.render())}render(){this.container.innerHTML=``,this.columns.forEach(e=>{let t=document.createElement(`div`);t.classList.add(`column`),t.innerHTML=`
        <div class="column__header">${e.title}</div>
        <div class="column__content" id="${e.id}"></div>
      `;let n=t.querySelector(`.column__content`);n.addEventListener(`dragover`,e=>{e.preventDefault(),n.classList.add(`drag-over`)}),n.addEventListener(`dragleave`,()=>{n.classList.remove(`drag-over`)}),n.addEventListener(`drop`,t=>{t.preventDefault(),n.classList.remove(`drag-over`);let r=t.dataTransfer.getData(`text/plain`);r&&this.updateTaskStatus(r,e.id)}),this.container.appendChild(t)}),this.tasks.filter(e=>e.title.toLowerCase().includes(this.searchQuery)||e.description.toLowerCase().includes(this.searchQuery)).forEach(e=>{let t=e.render(),n=document.getElementById(e.status);n&&n.appendChild(t)})}},n=class{constructor(e,t){this.container=document.querySelector(e),this.onSectionChange=t,this.navItems=[{id:`board`,title:`Доска задач`},{id:`analytics`,title:`Аналитика`},{id:`settings`,title:`Настройки команды`}],this.activeSection=`board`}render(){this.container.innerHTML=``;let e=document.createElement(`ul`);e.className=`nav__list`,this.navItems.forEach(t=>{let n=document.createElement(`li`);n.className=`nav__item ${t.id===this.activeSection?`nav__item--active`:``}`,n.textContent=t.title,n.addEventListener(`click`,()=>this.handleNavClick(t.id)),e.appendChild(n)}),this.container.appendChild(e)}handleNavClick(e){this.activeSection=e,this.render(),this.onSectionChange&&this.onSectionChange(e)}},r=class{constructor(e){this.container=document.getElementById(e),this.team=[{id:Date.now(),name:`Иван Иванов (Ты)`,role:`admin`},{id:Date.now()+1,name:`Алексей Смирнов`,role:`editor`},{id:Date.now()+2,name:`Елена Валуева`,role:`viewer`}]}addMember(e,t){e.trim()&&(this.team.push({id:Date.now(),name:e,role:t}),this.render())}removeMember(e){this.team=this.team.filter(t=>t.id!==e),this.render()}render(){this.container.innerHTML=`
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
        ${this.team.map(e=>`
          <li class="team-member">
            <div class="team-member__info">
              <div class="avatar">${e.name.charAt(0)}</div>
              <span class="team-member__name">${e.name}</span>
              <span class="team-member__role team-member__role--${e.role}">
                ${this.translateRole(e.role)}
              </span>
            </div>
            <button class="btn-remove" data-id="${e.id}">Исключить</button>
          </li>
        `).join(``)}
      </ul>
    `,this.attachEvents()}translateRole(e){return{admin:`Админ`,editor:`Редактор`,viewer:`Наблюдатель`}[e]||e}attachEvents(){this.container.querySelector(`#add-member-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=this.container.querySelector(`#new-member-name`).value,n=this.container.querySelector(`#new-member-role`).value;this.addMember(t,n)}),this.container.querySelectorAll(`.btn-remove`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.target.getAttribute(`data-id`));this.removeMember(t)})})}},i=class{constructor(e){this.container=document.getElementById(e),this.stats={totalTasks:42,completedTasks:28,activeMembers:3,productivity:66}}render(){this.container.innerHTML=`
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
    `}},a=class{constructor(e,t){this.modal=document.getElementById(e),this.onTaskSave=t,this.form=this.modal.querySelector(`#new-task-form`),this.closeBtn=this.modal.querySelector(`#close-modal-btn`),this.titleEl=this.modal.querySelector(`#modal-title`),this.submitBtn=this.modal.querySelector(`#modal-submit-btn`),this.editingTaskId=null,this.attachEvents()}open(e=null){this.editingTaskId=e?e.id:null,e?(this.titleEl.textContent=`Редактировать задачу`,this.submitBtn.textContent=`Сохранить изменения`,this.form.querySelector(`#task-title`).value=e.title,this.form.querySelector(`#task-desc`).value=e.description,this.form.querySelector(`#task-status`).value=e.status):(this.titleEl.textContent=`Новая задача`,this.submitBtn.textContent=`Создать задачу`,this.form.reset()),this.modal.style.display=`flex`}close(){this.modal.style.display=`none`,this.form.reset(),this.editingTaskId=null}attachEvents(){this.closeBtn.addEventListener(`click`,()=>this.close()),this.modal.addEventListener(`click`,e=>{e.target===this.modal&&this.close()}),this.form.addEventListener(`submit`,e=>{e.preventDefault();let t=this.form.querySelector(`#task-title`).value,n=this.form.querySelector(`#task-desc`).value,r=this.form.querySelector(`#task-status`).value,i={id:this.editingTaskId||Date.now(),title:t,description:n,status:r};this.onTaskSave&&this.onTaskSave(i),this.close()})}},o=class{constructor(){this.baseUrl=`https://jsonplaceholder.typicode.com`}async fetchTasks(){try{let e=await fetch(`${this.baseUrl}/todos?_limit=4`,{method:`GET`});if(!e.ok)throw Error(`Ошибка сети: ${e.status}`);return(await e.json()).map(e=>({id:e.id,title:e.title,description:`Задача загружена через REST API`,status:e.completed?`done`:`todo`}))}catch(e){return console.error(`Ошибка при получении данных:`,e),[]}}async createTask(e){try{let t=await fetch(`${this.baseUrl}/todos`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`Ошибка при создании`);return await t.json()}catch(e){throw console.error(`Ошибка POST запроса:`,e),e}}};document.addEventListener(`DOMContentLoaded`,async()=>{let e,s=new o,c=new a(`task-modal`,async t=>{if(e.tasks.some(e=>e.id===t.id))e.updateTask(t);else try{await s.createTask(t),e.addTask(t)}catch{alert(`Не удалось создать задачу на сервере`)}});e=new t(`kanban-board`,e=>{c.open(e)});let l=new r(`team-settings`),u=new i(`analytics-panel`),d=document.getElementById(`kanban-board`),f=document.getElementById(`team-settings`),p=document.getElementById(`analytics-panel`);new n(`.nav`,t=>{d.style.display=`none`,f.style.display=`none`,p.style.display=`none`,t===`board`?(d.style.display=`flex`,e.render()):t===`settings`?(f.style.display=`block`,l.render()):t===`analytics`&&(p.style.display=`block`,u.render())}).render(),d.style.display=`flex`,d.innerHTML=`<p style="padding: 2rem;">Загрузка задач с сервера...</p>`;let m=await s.fetchTasks();e.tasks=[],e.render(),m.forEach(t=>{e.addTask(t)}),document.getElementById(`add-task-btn`).addEventListener(`click`,()=>{c.open()});let h=document.getElementById(`search-input`);h&&h.addEventListener(`input`,t=>{e.setSearchQuery(t.target.value)})});