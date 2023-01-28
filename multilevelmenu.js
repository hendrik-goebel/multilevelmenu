const classes = {
  toggled: 'toggled',
  isActive: 'is-active',
  active: 'active',
  ariaExpanded: 'aria-expanded',
  itemHasChildren: 'page_item_has_children',
  subNavToggle: 'sub-nav-toggle',
  menuToggle: 'menu-toggle',
  mainNavigation: 'main-navigation',
  navMenu: 'nav-menu'
}

// this is the breakpoint for switching the menu
const smallScreenMinWidth = 999

// Mobile navigation controls
let $menuToggle = document.getElementsByClassName(classes.menuToggle)[0];
let $menuContainer = document.getElementsByClassName(classes.mainNavigation)[0];
let $navMenu = document.getElementsByClassName(classes.navMenu)[0];

// Add toggles to menu items that have submenus and bind to click event
var subMenuItems = document.querySelectorAll('.' + classes.itemHasChildren + ' > a');
for (let index = 0; index < subMenuItems.length; index++) {
  let $dropdownArrow = document.createElement('span');
  $dropdownArrow.className = classes.subNavToggle;
  subMenuItems[index].parentNode.insertBefore($dropdownArrow, subMenuItems[index].nextSibling);
}

// Enables toggling all submenus individually
var subMenuToggle = document.querySelectorAll('.' + classes.subNavToggle);
for (index = 0; index < subMenuToggle.length; index++) {
  if (subMenuToggle.hasOwnProperty(index)) {
    subMenuToggle[index].onclick = function () {
      this.parentElement.querySelector('.children').classList.toggle(classes.active);
      this.parentElement.querySelector('.' + classes.subNavToggle).classList.toggle(classes.active);
      this.parentElement.parentElement.querySelector('.' + classes.itemHasChildren).classList.toggle(classes.active);
    };
  }
}

// set WAI-ARIA values for nav and toggle button
$menuToggle.setAttribute(classes.ariaExpanded, 'false');
$navMenu.setAttribute(classes.ariaExpanded, 'false');


// Toggle main menu and set WAI-ARIA values when menu button is clicked
$menuToggle.onclick = function () {
  if ($menuContainer.classList.contains(classes.toggled)) {
    $menuContainer.classList.remove(classes.isActive, classes.toggled)
    $menuToggle.setAttribute(classes.ariaExpanded, 'false')
    $navMenu.setAttribute(classes.ariaExpanded, 'true')
  } else {
    $menuContainer.classList.add(classes.isActive, classes.toggled)
    $menuToggle.setAttribute(classes.ariaExpanded, 'true')
    $navMenu.setAttribute(classes.ariaExpanded, 'true')
  }
};

// Reset mobile nav for laptop and desktop
window.addEventListener('resize', disableMobileNav);

function disableMobileNav() {
  if (window.innerWidth > smallScreenMinWidth) {
    $menuToggle.classList.remove(classes.isActive, classes.toggled)
    $menuToggle.setAttribute(classes.ariaExpanded, 'false');
    $navMenu.setAttribute(classes.ariaExpanded, 'true');
  } else {
    $navMenu.setAttribute(classes.ariaExpanded, 'false');
  }
}

