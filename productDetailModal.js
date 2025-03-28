const productDetailsModal = document.getElementById('productDetailsModal');

const closeModalBtn = document.getElementById('closeModalBtn');

const productDetailsImg = document.getElementById('productDetailsImg');

const productName = document.getElementById('productName');

const productPrice = document.getElementById('productPrice');

const productDescription = document.getElementById('productDescription');

const productUrl = document.getElementById('productUrl');


function openProductModal(product) {

  productDetailsImg.setAttribute('src', `${product.images_url}`);
  productDetailsImg.setAttribute('alt', `${product.product_name}`);

  productName.textContent = product.product_name;
  productPrice.textContent = product.product_price;
  productDescription.textContent = product.product_description;

  productUrl.setAttribute('href', `${product.whatsapp_product_url}`);

  productDetailsModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productDetailsModal.classList.add('hidden');

}

closeModalBtn.addEventListener('click', closeProductModal);

export { openProductModal };
