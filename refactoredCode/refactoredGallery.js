const filterSection = document.querySelector('.filter');
const filterSectionChildrens = [...filterSection.children];

const prevBtn = document.getElementById('prevBtn');
const prevBtnArrow = document.getElementById('prevBtnArrow');
const nextBtn = document.getElementById('nextBtn');
const nextBtnArrow = document.getElementById('nextBtnArrow');

const galleryContainer = document.querySelector('.galleryContainer');
const galleryGridsContainer = document.querySelector('.galleryGridsContainer');
const pageIndicatorContainer = document.querySelector('.pageIndicator__container');

let paginationDots = [];
let currentPosition = 0;
let currentPage = 1;
const galleryContainerWidth = galleryContainer.clientWidth;

/* function filterByCategory(selectedCategory) {
  const filteredProducts = selectedCategory === 'Todos' ? products : products.filter(product => product.product_category === selectedCategory);
  const filteredProductPages = createProductsPagination(filteredProducts);
  createProductGallery(filteredProductPages);
} */

/* function createProductGallery(productPagesArr) {
  resetGallery();

  if (productPagesArr.length === 0) {
    displayEmptyCategoryMessage();
  } else {
    productPagesArr.forEach((page, index) => {
      createGalleryGrid(page, index + 1);
    });
    paginationDots = document.querySelectorAll('.pageIndicator');
    updatePaginationDot();
  }
} */

/* function resetGallery() {
  galleryGridsContainer.style.transform = 'translateX(0px)';
  galleryGridsContainer.innerHTML = '';
  pageIndicatorContainer.innerHTML = '';
  currentPosition = 0;
  currentPage = 1;
  toggleNavigationButtons(productPagesArr.length < 2);
} */

/* function displayEmptyCategoryMessage() {
  const emptyCategoryContainer = createElement('div', 'emptyCategory__container');
  const emptyCategoryMessage = createElement('p', 'emptyCategory__message', 'En este momento no tenemos productos disponibles de esta categoría.');
  const emptyCategorySuggestion = createElement('p', 'emptyCategory__suggestion', 'Te sugerimos verificarlo más adelante o elegir otra categoría.');

  emptyCategoryContainer.append(emptyCategoryMessage, emptyCategorySuggestion);
  galleryGridsContainer.appendChild(emptyCategoryContainer);
} */

/* function createGalleryGrid(page, pageNumber) {
  const galleryGrid = createElement('div', 'galleryGrid', null, { id: pageNumber });
  const pageIndicator = createElement('div', 'pageIndicator', null, { id: pageNumber });

  page.forEach(product => {
    const productItem = createElement('div', 'productItem', null, { id: product.id });
    const productItemImg = createElement('img', 'productItem__img', null, { src: product.images_url, alt: product.product_name });
    productItem.appendChild(productItemImg);
    galleryGrid.appendChild(productItem);
  });

  galleryGridsContainer.appendChild(galleryGrid);
  pageIndicatorContainer.appendChild(pageIndicator);
} */

/* function createElement(tag, className, textContent = null, attributes = {}) {
  const element = document.createElement(tag);
  element.className = className;
  if (textContent) element.textContent = textContent;
  Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
  return element;
} */

/* function updatePaginationDot() {
  paginationDots.forEach(dot => dot.classList.remove('pageIndicator--active'));
  if (paginationDots.length > 0) paginationDots[currentPage - 1].classList.add('pageIndicator--active');
} */

/* function galleryNavigator(pageId) {
  if (galleryGridsContainer.children.length > 1) {
    const distance = currentPosition + (galleryContainerWidth * pageId);
    galleryGridsContainer.style.transform = `translateX(${distance}px)`;
    currentPosition = distance;
  }
} */

/* function goToNextPage() {
  if (currentPosition !== (galleryGridsContainer.children.length - 1) * (-galleryContainerWidth)) {
    galleryNavigator(-1);
    currentPage++;
    updatePaginationDot();
    toggleNavigationButtons(currentPosition === (galleryGridsContainer.children.length - 1) * (-galleryContainerWidth));
  }
} */

/* function goToPrevPage() {
  if (currentPosition < 0) {
    galleryNavigator(1);
    currentPage--;
    updatePaginationDot();
    toggleNavigationButtons(currentPosition === 0);
  }
} */

/* function toggleNavigationButtons(isEnd) {
  prevBtn.classList.toggle('catalog__button--disabled', isEnd);
  prevBtnArrow.classList.toggle('catalog__button__arrow--disabled', isEnd);
  nextBtn.classList.toggle('catalog__button--disabled', !isEnd);
  nextBtnArrow.classList.toggle('catalog__button__arrow--disabled', !isEnd);
} */

filterSection.addEventListener('click', (e) => {
  if (e.target.localName !== 'ul') {
    filterSectionChildrens.forEach(filterItem => filterItem.classList.remove('filter__item--active'));
    e.target.classList.add('filter__item--active');
    filterByCategory(e.target.textContent);
  }
});

let startX, startY;

galleryGridsContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

galleryGridsContainer.addEventListener('touchend', (e) => {
  if (!startX || !startY) return;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const difX = startX - endX;
  const difY = startY - endY;

  if (Math.abs(difY) < 50) {
    if (difX > 50) {
      goToNextPage();
    } else if (difX < -50) {
      goToPrevPage();
    }
  }

  startX = null;
  startY = null;
});

prevBtn.addEventListener('click', goToPrevPage);
nextBtn.addEventListener('click', goToNextPage);