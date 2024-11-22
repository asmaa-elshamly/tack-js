// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let btnBuy = document.querySelector('.btn-buy');

// open cart
cartIcon.onclick = () => {
    cart.classList.toggle("hidden");
};

// close cart
closeCart.onclick = () => {
    cart.classList.toggle("hidden");
};

// cart working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// making function
function ready() {
    // remove items
    updateCartButtons();

    // quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

// update cart buttons for removing items
function updateCartButtons() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
}

// add to cart function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

// add product to cart
function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title');

    // Check if product is already in the cart
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    // Create cart item HTML
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-box");
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fa-solid fa-trash cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    // Add event listeners for the new item
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// quantity changed
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// update total price
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];

    if (!cartContent) {
        console.error("Cart content element not found");
        return;
    }

    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

        if (!priceElement || !quantityElement) {
            console.error("Price or quantity element not found in cart box");
            continue;
        }

        var price = parseFloat(priceElement.innerText.replace(/[^0-9.-]+/g, ''));
        var quantity = parseInt(quantityElement.value);

        if (isNaN(price) || isNaN(quantity) || quantity < 1) {
            console.error("Invalid price or quantity value");
            continue;
        }

        total += price * quantity;
        console.log(total);

    }

    var totalPriceElement = document.getElementsByClassName('total-price')[0];
    if (totalPriceElement) {
        totalPriceElement.innerText = 'EGP ' + total.toFixed(2);
    } else {
        console.error("Total price element not found");
    }
}
btnBuy.addEventListener('click', updateTotal());