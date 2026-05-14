export class Sidebar {
    constructor(containerSelector, onSectionChange) {
        this.container = document.querySelector(containerSelector);
        this.onSectionChange = onSectionChange;
        this.navItems = [
            { id: 'board', title: 'Доска задач' },
            { id: 'analytics', title: 'Аналитика' },
            { id: 'settings', title: 'Настройки команды' }
        ];
        this.activeSection = 'board';
    }

    render() {
        this.container.innerHTML = '';
        const navList = document.createElement('ul');
        navList.className = 'nav__list';

        this.navItems.forEach(item => {
            const li = document.createElement('li');
            const isActive = item.id === this.activeSection;
            li.className = `nav__item ${isActive ? 'nav__item--active' : ''}`;
            li.textContent = item.title;

            li.addEventListener('click', () => this.handleNavClick(item.id));

            navList.appendChild(li);
        });

        this.container.appendChild(navList);
    }

    handleNavClick(sectionId) {
        this.activeSection = sectionId;
        this.render();
        if (this.onSectionChange) {
            this.onSectionChange(sectionId);
        }
    }
}