const filterSection = document.querySelector('.filter');
const filterSectionChildrens = [...filterSection.children];

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const galleryContainer = document.querySelector('.galleryContainer')
const galleryGridsContainer = document.querySelector('.galleryGridsContainer');
const pageIndicatorContainer = document.querySelector('.pageIndicator__container');

let paginationDots = [];

let currentPosition = 0;
let currentPage;
let galleryContainerWidth = galleryContainer.clientWidth;

function filterByCategory(selectedCategory) {
  if (selectedCategory === 'Todos') {
    createProductGallery(productPages);
  } else {
    let filteredProducts = products.filter((product) => {
      return product.product_category ==  selectedCategory;
    })

    console.log(filteredProducts);

    let filteredProductPages = createProductsPagination(filteredProducts);

    createProductGallery(filteredProductPages);
  }
}

function createProductGallery(productPagesArr) {

  galleryGridsContainer.style.transform = `translateX(0px)`;

  if (productPagesArr.length < 2) {
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
    prevBtn.classList.add('catalog__button--disabled');
    nextBtn.classList.remove('hidden');
    nextBtn.classList.remove('catalog__button--disabled');
  }


  currentPosition = 0;

  let pageNumber = 1;

  galleryGridsContainer.innerHTML = '';
  pageIndicatorContainer.innerHTML = '';

  if (productPagesArr.length === 0) {
    let emptyCategoryContainer = document.createElement('div');
    emptyCategoryContainer.classList.add('emptyCategory__container');

    let emptyCategoryMessage = document.createElement('p');
    emptyCategoryMessage.classList.add('emptyCategory__message');
    emptyCategoryMessage.textContent = 'En este momento no tenemos productos disponibles de esta categoría.';

    let emptyCategorySuggestion = document.createElement('p');
    emptyCategorySuggestion.classList.add('emptyCategory__suggestion');
    emptyCategorySuggestion.textContent = 'Te sugerimos verificarlo más adelante o elegir otra categoría.';

    emptyCategoryContainer.appendChild(emptyCategoryMessage);
    emptyCategoryContainer.appendChild(emptyCategorySuggestion);
    galleryGridsContainer.appendChild(emptyCategoryContainer);
  } else {

    productPagesArr.forEach(page => {

      let galleryGrid = document.createElement('div');
      galleryGrid.setAttribute('id', pageNumber);
      galleryGrid.classList.add('galleryGrid');
      galleryGridsContainer.appendChild(galleryGrid);
  
      let pageIndicator = document.createElement('div');
      pageIndicator.setAttribute('id', pageNumber);
      pageIndicator.classList.add('pageIndicator');
      pageIndicatorContainer.appendChild(pageIndicator);
  
      for (let i = 0; i < page.length; i++) {
        let productItem = document.createElement('div');
        productItem.classList.add('productItem');
        productItem.setAttribute('id', page[i].id);
  
        let productItemImg = document.createElement('img');
        productItemImg.classList.add('productItem__img');
        productItemImg.setAttribute('src', page[i].images_url);
        productItemImg.setAttribute('alt', page[i].product_name);
  
        productItem.appendChild(productItemImg);
  
        galleryGrid.appendChild(productItem);
      }
  
      pageNumber++;
  
    });
  
    paginationDots = document.querySelectorAll('.pageIndicator');
    
    currentPage = 1;
    
    if (paginationDots.length > 0) {
      paginationDots[0].classList.add('pageIndicator--active');
    }
    
  }

}

function changePaginationDot() {
  if (paginationDots.length > 0) {
    paginationDots.forEach((dot) => {
      dot.classList.remove('pageIndicator--active');
    })

    paginationDots[currentPage - 1].classList.add('pageIndicator--active');
  }
}

function galleryNavigator(pageId) {

  if (galleryGridsContainer.children.length > 1) {

    let distance = currentPosition + (galleryContainerWidth * pageId);

    galleryGridsContainer.style.transform = `translateX(${distance}px)`;
  
    currentPosition = distance;

  }
}

filterSection.addEventListener('click', (e) => {

  if(e.target.localName != 'ul') {

    filterSectionChildrens.forEach(filterItem => {
      filterItem.classList.remove('filter__item--active');
    });
    e.target.classList.add('filter__item--active');
    filterByCategory(e.target.textContent);

  }
})

prevBtn.addEventListener('click', () => {

  if (currentPosition < 0) {
    galleryNavigator(1);
    currentPage--;
    changePaginationDot();
  } 

  if (currentPosition === 0) {
    prevBtn.classList.add('catalog__button--disabled');
    nextBtn.classList.remove('catalog__button--disabled');
  } else {
    prevBtn.classList.remove('catalog__button--disabled');
    nextBtn.classList.remove('catalog__button--disabled');
  }

})

nextBtn.addEventListener('click', () => {

  if (currentPosition != (galleryGridsContainer.children.length - 1) * (-galleryContainerWidth)) {

    galleryNavigator(-1);
    currentPage++;
    changePaginationDot();
  }
  
  if (currentPosition === (galleryGridsContainer.children.length - 1) * (-galleryContainerWidth)) {

    prevBtn.classList.remove('catalog__button--disabled');
    nextBtn.classList.add('catalog__button--disabled');

  } else {

    nextBtn.classList.remove('catalog__button--disabled');
    prevBtn.classList.remove('catalog__button--disabled');

  }

})