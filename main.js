let products = [];

let productPages = [];


const catalogUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwgiiAm4dD5NjC9xFZDm7seaXbm621-wWXprgH83QYu1f7QbrqqFyOK_sp3LXI10MGBLeC6gwI_oMc/pub?gid=0&single=true&output=csv';

const filterSection = document.querySelector('.filter');

const galleryGridsContainer = document.querySelector('.galleryGridsContainer');


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

    let filteredProductPages = createProductsPagination(filteredProducts)

    createProductGallery(filteredProductPages);


  }
}

function createProductGallery(productPagesArr) {

  galleryGridsContainer.innerHTML = '';

  productPagesArr.forEach(page => {

    let galleryGrid = document.createElement('div');
    galleryGrid.classList.add('galleryGrid');
    galleryGridsContainer.appendChild(galleryGrid);

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
  });
}

window.addEventListener('load', getProducts);

filterSection.addEventListener('click', (e) => {
  filterByCategory(e.target.textContent);
})