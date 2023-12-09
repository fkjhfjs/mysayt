// Пример объекта, представляющего продукт
function Product(id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
}

// Пример объекта, представляющего элемент корзины
function CartItem(product, quantity) {
  this.product = product;
  this.quantity = quantity;
}

// Пример объекта корзины
function Cart() {
  this.items = [];

  this.addToCart = function(product, quantity) {
    // Проверяем, есть ли уже этот продукт в корзине
    var existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
      // Если продукт уже в корзине, увеличиваем количество
      existingItem.quantity += quantity;
    } else {
      // Иначе, добавляем новый элемент в корзину
      var newItem = new CartItem(product, quantity);
      this.items.push(newItem);
    }

    this.updateCartDisplay();
  };

  this.updateCartDisplay = function() {
    // Пример: обновление отображения корзины на странице
    var cartDisplay = document.getElementById('cartDisplay');
    cartDisplay.innerHTML = '';

    this.items.forEach(function(item) {
      var itemElement = document.createElement('div');
      itemElement.innerHTML = item.product.name + ' - ' + item.quantity + ' шт. - $' + (item.product.price * item.quantity).toFixed(2);
      cartDisplay.appendChild(itemElement);
    });
  };
}

// Пример использования
var chocolateCake = new Product(1, 'Шоколадный торт', 25.00);
var vanillaCupcake = new Product(2, 'Ванильный кекс', 3.50);

var myCart = new Cart();

// Пример кнопок на странице
var addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var productId = button.getAttribute('data-product-id');
    var quantityInput = document.querySelector('.quantity-input[data-product-id="' + productId + '"]');
    var quantity = parseInt(quantityInput.value, 10);

    if (!isNaN(quantity) && quantity > 0) {
      // Добавляем продукт в корзину
      var productToAdd = productId === '1' ? chocolateCake : vanillaCupcake;
      myCart.addToCart(productToAdd, quantity);
    }
  });
});
