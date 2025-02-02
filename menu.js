const menuBtn = document.getElementById('menuBtn');
const menuBtnTopLine = document.getElementById('menuBtnTopLine');
const menuBtnMiddleLine = document.getElementById('menuBtnMiddleLine');
const menuBtnBottomLine = document.getElementById('menuBtnBottomLine');

const menuContainer = document.getElementById('menuContainer');

const navMenu = document.querySelector('.nav__menu');
const navIg = document.querySelector('.nav__ig');

menuBtn.addEventListener('click', () => {

  menuContainer.classList.toggle('menu--open');
  menuBtnTopLine.classList.toggle('menuBtn__topLine--close');
  menuBtnMiddleLine.classList.toggle('menuBtn__middleLine--close');
  menuBtnBottomLine.classList.toggle('menuBtn__bottomLine--close');

})

navMenu.childNodes.forEach((navItem) => {
  navItem.addEventListener('click', () => {
    menuContainer.classList.remove('menu--open');
    menuBtnTopLine.classList.remove('menuBtn__topLine--close');
    menuBtnMiddleLine.classList.remove('menuBtn__middleLine--close');
    menuBtnBottomLine.classList.remove('menuBtn__bottomLine--close');
  })
})
