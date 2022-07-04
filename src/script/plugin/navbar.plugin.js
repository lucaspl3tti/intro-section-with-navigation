export default class NavbarPlugin {
    constructor(el) {
        this.el = document.querySelector(el);

        // select navbar toggle, collapse element and close elmenent
        this.navbarToggle = this.el.querySelector('#navbarToggle');
        this.navbarToggleTarget = this.navbarToggle.getAttribute('data-navbar-toggle-target');
        this.navCollapse = this.el.querySelector(this.navbarToggleTarget);
        this.navCollapseClose = this.navCollapse.querySelector('.navbar-close');

        // select all dropdown elements
        this.dropdowns = this.navCollapse.querySelectorAll('.navbar-item--with-dropdown');

        this.registerEvents();
    }

    registerEvents() {
        this.navbarToggle.addEventListener('click', () => this.onClickNavbarToggle());
        this.navCollapseClose.addEventListener('click', () => this.onClickNavCollapseClose());

        this.dropdowns.forEach((dropdown) => this.registerDropdownEvents(dropdown));
    }

    registerDropdownEvents(dropdown) {
        const dropdownLink = dropdown.querySelector('.navbar-link');
        const navbarLinkIconDown = dropdownLink.querySelector('.nav-link-icon.icon--arrow-down');
        const navbarLinkIconUp = dropdownLink.querySelector('.nav-link-icon.icon--arrow-up');
        const dropdownChild = dropdown.querySelector('.navbar-list-dropdown');

        dropdownLink.addEventListener('click', () => this.onClickDropdown(dropdown, dropdownChild, navbarLinkIconDown, navbarLinkIconUp));
    }

    onClickNavbarToggle() {
        const navCollapseVisible = this.checkVisibility(this.navCollapse);

        if (navCollapseVisible) return;

        this.showNavCollapse();
    }

    onClickNavCollapseClose() {
        const navCollapseVisible = this.checkVisibility(this.navCollapse);

        if (!navCollapseVisible) return;

        this.hideNavCollapse();
    }

    onClickDropdown(target, targetChild, iconDown, iconUp) {
        const dropdownVisible = this.checkVisibility(targetChild);
        this.checkForOpenDropdown();

        if (dropdownVisible) {
            iconDown.classList.remove('hidden');
            iconUp.classList.add('hidden');
            targetChild.classList.add('hidden');
            target.classList.remove('active');
            return;
        }

        iconDown.classList.add('hidden');
        iconUp.classList.remove('hidden');
        targetChild.classList.remove('hidden');
        target.classList.add('active');
    }

    showNavCollapse() {
        this.navCollapse.classList.remove('hidden');
        this.navCollapse.classList.add('navigation-collapse--collapsing');
        setTimeout(() => {
            this.navCollapse.classList.remove('navigation-collapse--collapsing');
            this.navCollapse.classList.add('navigation-collapse--collapsed');
        }, 120);
    }

    hideNavCollapse() {
        this.navCollapse.classList.remove('navigation-collapse--collapsed');
        this.navCollapse.classList.add('navigation-collapse--closing');
        setTimeout(() => {
            this.navCollapse.classList.remove('navigation-collapse--closing');
            this.navCollapse.classList.add('hidden');
        }, 350);
    }

    checkVisibility(target) {
        return target.classList.contains('hidden') ? false : true;
    }

    checkForOpenDropdown() {
        this.dropdowns.forEach((dropdown) => {
            const dropdownChild = dropdown.querySelector('.navbar-list-dropdown');
            const iconDown = dropdown.querySelector('.nav-link-icon.icon--arrow-down');
            const iconUp = dropdown.querySelector('.nav-link-icon.icon--arrow-up');

            const dropwdownChildVisible = this.checkVisibility(dropdownChild);

            if (!dropwdownChildVisible) return;

            iconDown.classList.remove('hidden');
            iconUp.classList.add('hidden');
            dropdownChild.classList.add('hidden');
            dropdown.classList.remove('active');
        });
    }
}
