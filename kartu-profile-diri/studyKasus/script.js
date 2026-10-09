let cart = [];

const orderForm = document.getElementById('orderForm');
const selectMenu = document.getElementById('selectMenu');
const inputQuantity = document.getElementById('inputQuantity');
const cartDisplayWrapper = document.getElementById('cartDisplayWrapper');
const totalPriceOutput = document.getElementById('totalPriceOutput');

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = selectMenu.options[selectMenu.selectedIndex];
    const itemCode = selectedOption.value;
    const itemName = selectedOption.getAttribute('data-name');
    const itemPrice = parseInt(selectedOption.getAttribute('data-price'), 10);
    const quantity = parseInt(inputQuantity.value, 10);

    if (quantity < 1 || isNaN(quantity)) return;

    const matchedItemIndex = cart.findIndex(product => product.code === itemCode);

    if (matchedItemIndex > -1) {
        cart[matchedItemIndex].quantity += quantity;
    } else {
        cart.push({
            code: itemCode,
            name: itemName,
            price: itemPrice,
            quantity: quantity
        });
    }

    inputQuantity.value = 1;

    renderCart();
});

function renderCart() {
    
    cartDisplayWrapper.innerHTML = '';

    if (cart.length === 0) {
        cartDisplayWrapper.innerHTML = '<p class="empty-state-text">Keranjang masih kosong. Silakan pilih menu di atas.</p>';
        totalPriceOutput.textContent = 'Rp0';
        return;
    }

    let runningTotalSum = 0;

    cart.forEach((item, indexPosition) => {
        const calculatedSubtotal = item.price * item.quantity;
        runningTotalSum += calculatedSubtotal;

        const itemRowElement = document.createElement('div');
        itemRowElement.className = 'cart-row-item';
        itemRowElement.innerHTML = `
            <div class="item-meta-info">
                <p class="item-title">${item.name}</p>
                <span class="item-calculation">${item.quantity} x Rp${item.price.toLocaleString('id-ID')}</span>
            </div>
            <div class="item-action-area">
                <span class="item-computed-subtotal">Rp${calculatedSubtotal.toLocaleString('id-ID')}</span>
                <button type="button" class="btn-action-delete" onclick="deleteCartItem(${indexPosition})">Hapus</button>
            </div>
        `;
        cartDisplayWrapper.appendChild(itemRowElement);
    });

    totalPriceOutput.textContent = `Rp${runningTotalSum.toLocaleString('id-ID')}`;
}

window.deleteCartItem = function(indexPosition) {

    cart.splice(indexPosition, 1);
    
    renderCart();
};

renderCart();