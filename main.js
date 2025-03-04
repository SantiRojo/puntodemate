let products = [];

let productPages = [];

const catalogUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwgiiAm4dD5NjC9xFZDm7seaXbm621-wWXprgH83QYu1f7QbrqqFyOK_sp3LXI10MGBLeC6gwI_oMc/pub?gid=0&single=true&output=csv';

window.addEventListener('load', getProducts);


async function getProducts() {

  let loadingGalleryGrid = document.createElement('div');
  loadingGalleryGrid.classList.add('galleryGrid');
  galleryGridsContainer.appendChild(loadingGalleryGrid);

  for (let i = 0; i < 9; i++) {
    let productItemLoader = document.createElement('div');
    productItemLoader.classList.add('productLoader');

    loadingGalleryGrid.appendChild(productItemLoader);
  }

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
  .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el ctálogo: ' + response.status);
      }
    
      return response.text()
  })
  .then(data => {
    products = parseCSV(data);
    productPages = createProductsPagination(products);
    createProductGallery(productPages);
  })
  .catch( Error => {

    galleryGridsContainer.innerHTML = '';

    let loadingErrorContainer = document.createElement('div');
    loadingErrorContainer.classList.add('loadingError__container');
    galleryGridsContainer.appendChild(loadingErrorContainer);

    let errorMessage = document.createElement('p');
    errorMessage.textContent = 'Ocurrió un error al intentar cargar el catálogo.';
    errorMessage.classList.add('loadingError__message');
    loadingErrorContainer.appendChild(errorMessage);

    let catalogLoadBtn = document.createElement('button');
    catalogLoadBtn.classList.add('catalogLoadBtn');
    catalogLoadBtn.textContent = 'Recargar';
    loadingErrorContainer.appendChild(catalogLoadBtn);

    catalogLoadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      getProducts();
    })

    console.error(Error);
    
  });

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