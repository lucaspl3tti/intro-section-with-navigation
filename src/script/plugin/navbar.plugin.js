export default class NavbarPlugin {
    constructor(el) {
        this.el = document.querySelector(el);

        // select navbar toggle and collapse element
        this.navbarToggle = this.el.querySelector('#navbarToggle');
        this.navbarToggleTarget = this.navbarToggle.getAttribute('data-navbar-toggle-target');
        this.navCollapse = this.el.querySelector(this.navbarToggleTarget);
        this.navCollapseClose = this.navCollapse.querySelector('.navbar-close');

        // navbar collapse visibility
        this.navCollapseVisible = false;

        // select dropdown elements
        this.dropdowns = this.navCollapse.querySelectorAll('.navbar-item--with-dropdown');

        this.registerEvents();
    }

    registerEvents() {
        this.navbarToggle.addEventListener('click', () => this.onClickNavbarToggle());
        this.navCollapseClose.addEventListener('click', () => this.onClickNavCollapseClose());

        this.dropdowns.forEach((dropdown) => this.registerDropdownEvents(dropdown));
    }

    registerDropdownEvents(targetEl) {
        const dropdownLink = targetEl.querySelector('.navbar-link'),
            navbarLinkIconDown = dropdownLink.querySelector('.nav-link-icon.icon--arrow-down'),
            navbarLinkIconUp = dropdownLink.querySelector('.nav-link-icon.icon--arrow-up'),
            dropdownChild = targetEl.querySelector('.navbar-list-dropdown');

        dropdownLink.addEventListener('click', () => this.onClickDropdown(targetEl, dropdownChild, navbarLinkIconDown, navbarLinkIconUp));
    }

    onClickNavbarToggle() {
        this.navCollapseVisible = this.checkVisibility(this.navCollapse);

        if (this.navCollapseVisible) return

        this.navCollapse.classList.remove('hidden');
        this.navCollapse.classList.add('navigation-collapse--collapsing');
        setTimeout(() => {
            this.navCollapse.classList.remove('navigation-collapse--collapsing');
            this.navCollapse.classList.add('navigation-collapse--collapsed');
        }, 120);
    }

    onClickNavCollapseClose() {
        this.navCollapseVisible = this.checkVisibility(this.navCollapse);

        if (!this.navCollapseVisible) return

        this.navCollapse.classList.remove('navigation-collapse--collapsed');
        this.navCollapse.classList.add('navigation-collapse--closing');
        setTimeout(() => {
            this.navCollapse.classList.remove('navigation-collapse--closing');
            this.navCollapse.classList.add('hidden');
        }, 350);
    }

    onClickDropdown(target, targetChild, iconDown, iconUp) {
        let dropdownVisible = this.checkVisibility(targetChild);
        this.checkForOpenDropdown();

        if (dropdownVisible) {
            iconDown.classList.remove('hidden');
            iconUp.classList.add('hidden');
            targetChild.classList.add('hidden');
            target.classList.remove('active');
            return
        }

        iconDown.classList.add('hidden');
        iconUp.classList.remove('hidden');
        targetChild.classList.remove('hidden');
        target.classList.add('active');
    }

    checkVisibility(target) {
        const containsHiddenClass = target.classList.contains('hidden')

        return containsHiddenClass ? false : true;
    }

    checkForOpenDropdown() {
        this.dropdowns.forEach((dropdown) => {
            const dropdownChild = dropdown.querySelector('.navbar-list-dropdown'),
                iconDown = dropdown.querySelector('.nav-link-icon.icon--arrow-down'),
                iconUp = dropdown.querySelector('.nav-link-icon.icon--arrow-up');

            let dropwdownChildVisible = this.checkVisibility(dropdownChild);

            if (!dropwdownChildVisible) return

            iconDown.classList.remove('hidden');
            iconUp.classList.add('hidden');
            dropdownChild.classList.add('hidden');
            dropdown.classList.remove('active');
        });
    }
}
