let products = [];

let productPages = [];


const catalogUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwgiiAm4dD5NjC9xFZDm7seaXbm621-wWXprgH83QYu1f7QbrqqFyOK_sp3LXI10MGBLeC6gwI_oMc/pub?gid=0&single=true&output=csv';

const filterSection = document.querySelector('.filter');
const filterSectionChildrens = [...filterSection.children];

const galleryContainer = document.querySelector('.galleryContainer')
const galleryGridsContainer = document.querySelector('.galleryGridsContainer');
const pageIndicatorContainer = document.querySelector('.pageIndicator__container');

let paginationDots = [];


async function getProducts() {

  // Función para convertir CSV a array de objetos
  function parseCSV(data) {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const products = [];
  
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(',');
      const product = {};
      for (let j = 0; j < headers.length; j++) {
        product[headers[j]] = values[j];
      }
      products.push(product);
    }
  
    return products;
  }

  await fetch(catalogUrl)
  .then(response => response.text())
  .then(data => {
    products = parseCSV(data); 
    console.log(products);
    productPages = createProductsPagination(products);
    console.log(productPages);
    createProductGallery(productPages);
  })
  .catch(error => console.error('Error al cargar los productos:', error));

}

function createProductsPagination(arr) {
  const productsPerPage = 9;
  const pages = [];
  let currentPage = [];

  for (let i = 0; i < arr.length; i++) {
    currentPage.push(arr[i]);

    if (currentPage.length === productsPerPage || i === arr.length - 1) {
      pages.push(currentPage);
      currentPage = []; 
    }
  }

  return pages;
}

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

  if (paginationDots.length > 0) {
    paginationDots[0].classList.add('pageIndicator--active');
  }
}

window.addEventListener('load', getProducts);

filterSection.addEventListener('click', (e) => {

  if(e.target.localName != 'ul') {

    filterSectionChildrens.forEach(filterItem => {
      filterItem.classList.remove('filter__item--active');
    });
    e.target.classList.add('filter__item--active');
    filterByCategory(e.target.textContent);

  }
})



let currentPosition = 0;
let galleryContainerWidth = galleryContainer.clientWidth;


function galleryNavigator(pageId) {

  if (galleryGridsContainer.children.length > 1) {
    let distance = currentPosition + (galleryContainerWidth * pageId);

    galleryGridsContainer.style.transform = `translateX(${distance}px)`;
  
    currentPosition = distance;
  
    console.log(currentPosition);

  }
}

const prevBtn = document.getElementById('prevBtn');

prevBtn.addEventListener('click', () => {

  if (currentPosition < 0) {
    galleryNavigator(1);

  } 

  if (currentPosition === 0) {
    prevBtn.classList.add('catalog__button--disabled');
    nextBtn.classList.remove('catalog__button--disabled');
  } else {
    prevBtn.classList.remove('catalog__button--disabled');
    nextBtn.classList.remove('catalog__button--disabled');
  }

})


const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {

  if (currentPosition != (galleryGridsContainer.children.length - 1) * (-galleryContainerWidth)) {

    galleryNavigator(-1);

  }
  
  if (currentPosition === (galleryGridsContainer.children.length - 1) * (-galleryContainerWidth)) {

    prevBtn.classList.remove('catalog__button--disabled');
    nextBtn.classList.add('catalog__button--disabled');

  } else {

    nextBtn.classList.remove('catalog__button--disabled');
    prevBtn.classList.remove('catalog__button--disabled');

  }

})