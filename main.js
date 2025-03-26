import { galleryGridsContainer, resetGallery, createProductGallery } from "./catalog.js";

let products = [];
let productPagesArr = [];

const catalogUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwgiiAm4dD5NjC9xFZDm7seaXbm621-wWXprgH83QYu1f7QbrqqFyOK_sp3LXI10MGBLeC6gwI_oMc/pub?gid=0&single=true&output=csv';

window.addEventListener('load', getProducts);

async function getProducts() {
  showLoading();

  try {
    const response = await fetch(catalogUrl);
    if (!response.ok) {
      throw new Error('Error al cargar el catálogo: ' + response.status);
    }

    const data = await response.text();
    products = parseCSV(data);
    productPagesArr = createProductsPagination(products);
    createProductGallery(productPagesArr);
  } catch (error) {
    showError(error);
  }
}

function createElement(tag, className, textContent = null, attributes = {}) {
  const element = document.createElement(tag);
  element.className = className;
  if (textContent) element.textContent = textContent;
  Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
  return element;
}

function showLoading() {
  const loadingGalleryGrid = createElement('div', 'galleryGrid');
  galleryGridsContainer.appendChild(loadingGalleryGrid);

  for (let i = 0; i < 9; i++) {
    const productItemLoader = createElement('div', 'productLoader');
    loadingGalleryGrid.appendChild(productItemLoader);
  }
}

function showError(error) {
  resetGallery();

  const loadingErrorContainer = createElement('div', 'loadingError__container');
  const errorMessage = createElement('p', 'loadingError__message', 'Ocurrió un error al intentar cargar el catálogo.');
  const catalogLoadBtn = createElement('button', 'catalogLoadBtn', 'Recargar');

  catalogLoadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getProducts();
  });

  loadingErrorContainer.append(errorMessage, catalogLoadBtn);
  galleryGridsContainer.appendChild(loadingErrorContainer);

  console.error(error);
}

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

function createProductsPagination(arr) {
  const productsPerPage = 9;
  const pages = [];
  let currentPage = [];

  arr.forEach((product, index) => {
    currentPage.push(product);
    if (currentPage.length === productsPerPage || index === arr.length - 1) {
      pages.push(currentPage);
      currentPage = [];
    }
  });

  return pages;
}

export {products, productPagesArr, createElement, createProductsPagination}