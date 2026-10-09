// DATA MASTER PRODUCT ES KRIM
const flavorsData = [
    { id: 1, name: "Strawberry Bliss", price: 25000, color: "#FFE5EC", img: "strawberry.jpg", popular: true },
    { id: 2, name: "Chocolate Fudge", price: 28000, color: "#F0E6DF", img: "coklat.jpg", popular: true },
    { id: 3, name: "Vanilla Dream", price: 22000, color: "#FFF8E7", img: "vanila.jpg", popular: false },
    { id: 4, name: "Mint Chocolate Chip", price: 26000, color: "#E8F8F5", img: "choco_mint.jpg", popular: true },
    { id: 5, name: "Mango Sunshine", price: 25000, color: "#FFF3E0", img: "mangga.jpg", popular: false },
    { id: 6, name: "Cookies & Cream", price: 29000, color: "#F2F2F2", img: "cookiescream.jpg", popular: true }
];

// DATA MASTER TOPPING
const toppingsData = [
    { id: 'top1', name: "Saus Belgian Chocolate", price: 4000, icon: "🍫" },
    { id: 'top2', name: "Saus Strawberry Fresh", price: 4000, icon: "🍓" },
    { id: 'top3', name: "Oreo Crumb Sprinkle", price: 3000, icon: "🍪" },
    { id: 'top4', name: "Rainbow Sprinkles", price: 2000, icon: "🌈" },
    { id: 'top5', name: "Kacang Almond Sangrai", price: 5000, icon: "🥜" },
    { id: 'top6', name: "Mini Marshmallow", price: 3000, icon: "🍡" }
];

// DATA MASTER UKURAN
const sizesData = [
    { id: 'size1', name: "Single Scoop", priceExtra: 0 },
    { id: 'size2', name: "Double Scoop", priceExtra: 10000 },
    { id: 'size3', name: "Waffle Cone Deluxe", priceExtra: 5000 },
    { id: 'size4', name: "Family Tub 500ml", priceExtra: 35000 }
];

// DATA ULASAN DEFAULT
let reviewsData = [
    { name: "Emily R.", rating: 5, text: "Es krim terbaik di kota! Variannya banyak dan pilihan topping-nya melimpah." },
    { name: "Jason M.", rating: 5, text: "Chocolate Fudge-nya dipadu saus Belgian Chocolate rasanya juara banget! Lembut dan nagih." },
    { name: "Sophia L.", rating: 5, text: "Pelayanannya ramah, kemasan Family Tub-nya aman sampai rumah. Sangat direkomendasikan!" }
];

let cart = [];
let activeCustomizingProduct = null;
let selectedSize = sizesData[0];
let selectedToppings = [];
let selectedReviewRating = 5;

// HELPER FORMAT CURRENCY
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// INIT APP
document.addEventListener('DOMContentLoaded', () => {
    renderAnimatedMenuSlider();
    renderToppingsGrid();
    renderReviews();
});

// WELCOME SCREEN & LOGIN FLOW
function goToLogin(mode) {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('loginOverlay').classList.remove('hidden');

    const title = document.getElementById('loginFormTitle');
    const sub = document.getElementById('loginFormSub');
    const confirmGrp = document.getElementById('confirmPasswordGroup');
    const btnSubmit = document.getElementById('btnSubmitAuth');

    if (mode === 'signup') {
        title.innerText = 'Daftar Akun Baru';
        sub.innerText = 'Buat akun Cone-Fidence kamu dalam hitungan detik!';
        confirmGrp.classList.remove('hidden');
        btnSubmit.innerText = 'Daftar Sekarang';
    } else {
        title.innerText = 'Selamat Datang!';
        sub.innerText = 'Silakan login untuk menikmati kelezatan es krim favorit Anda.';
        confirmGrp.classList.add('hidden');
        btnSubmit.innerText = 'Masuk ke Toko';
    }
}

function backToWelcome() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('welcomeScreen').classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('appContent').classList.remove('hidden');
}

function guestLogin() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('appContent').classList.remove('hidden');
}

function handleLogout() {
    document.getElementById('appContent').classList.add('hidden');
    document.getElementById('welcomeScreen').classList.remove('hidden');
}

// 2B. RENDER ANIMATED INFINITE MENU SLIDER
function renderAnimatedMenuSlider() {
    const track = document.getElementById('menuSliderTrack');
    if (!track) return;
    track.innerHTML = '';

    const duplicatedFlavors = [...flavorsData, ...flavorsData];

    duplicatedFlavors.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'flavor-card';
        
        const badgeHTML = item.popular ? `<span class="badge-populer"><i class="fa-solid fa-fire"></i> Favorit</span>` : '';

        card.innerHTML = `
            ${badgeHTML}
            <div class="img-placeholder flavor-img-box" style="background-color: ${item.color};">
                <img src="${item.img}" alt="${item.name}" onerror="this.style.display='none'">
                <div class="placeholder-text"><i class="fa-solid fa-ice-cream"></i><br>${item.name}</div>
            </div>
            <h4>${item.name}</h4>
            <div class="price">${formatRupiah(item.price)}</div>
            <button class="btn-primary btn-block" onclick="openCustomModal(${item.id})">PESAN SEKARANG</button>
        `;
        track.appendChild(card);
    });
}

function scrollMenuSlider(amount) {
    const wrapper = document.querySelector('.menu-slider-wrapper');
    if (wrapper) {
        wrapper.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

// 2C. RENDER TOPPINGS GRID
function renderToppingsGrid() {
    const container = document.getElementById('toppingsGrid');
    if (!container) return;
    container.innerHTML = '';

    toppingsData.forEach(top => {
        const card = document.createElement('div');
        card.className = 'topping-card';
        card.innerHTML = `
            <div class="topping-icon-box">${top.icon}</div>
            <h4>${top.name}</h4>
            <div class="top-price">+${formatRupiah(top.price)}</div>
        `;
        container.appendChild(card);
    });
}

// 3. RENDER ULASAN & FITUR TAMBAH ULASAN AUTOMATIS
function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    container.innerHTML = '';

    reviewsData.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const starsStr = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);

        card.innerHTML = `
            <div class="stars">${starsStr}</div>
            <p>"${rev.text}"</p>
            <div class="user-info">
                <div class="avatar-placeholder">
                    <i class="fa-solid fa-user"></i>
                </div>
                <span class="user-name">- ${rev.name}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function setRating(rating) {
    selectedReviewRating = rating;
    const stars = document.querySelectorAll('#starRatingSelector span');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function handleAddReview(e) {
    e.preventDefault();
    const nameInput = document.getElementById('revName').value.trim();
    const commentInput = document.getElementById('revComment').value.trim();

    if (!nameInput || !commentInput) return;

    reviewsData.unshift({
        name: nameInput,
        rating: selectedReviewRating,
        text: commentInput
    });

    renderReviews();

    document.getElementById('reviewForm').reset();
    setRating(5);
    alert('Terima kasih! Ulasan Anda telah berhasil ditambahkan.');
}

// KUSTOMISASI MODAL OPEN/CLOSE
function openCustomModal(productId) {
    activeCustomizingProduct = flavorsData.find(p => p.id === productId);
    selectedSize = sizesData[0];
    selectedToppings = [];

    document.getElementById('modalFlavorTitle').innerText = 'Kustom: ' + activeCustomizingProduct.name;
    
    renderSizeOptions();
    renderToppingOptions();
    calculateModalPrice();

    document.getElementById('customModal').classList.remove('hidden');
}

function closeCustomModal() {
    document.getElementById('customModal').classList.add('hidden');
}

function renderSizeOptions() {
    const grid = document.getElementById('sizeOptionsGrid');
    grid.innerHTML = '';

    sizesData.forEach(size => {
        const box = document.createElement('div');
        box.className = `option-box ${selectedSize.id === size.id ? 'selected' : ''}`;
        box.innerHTML = `
            <span>${size.name}</span>
            <small>${size.priceExtra > 0 ? '+' + formatRupiah(size.priceExtra) : 'Gratis'}</small>
        `;
        box.onclick = () => {
            selectedSize = size;
            renderSizeOptions();
            calculateModalPrice();
        };
        grid.appendChild(box);
    });
}

function renderToppingOptions() {
    const grid = document.getElementById('toppingOptionsGrid');
    grid.innerHTML = '';

    toppingsData.forEach(top => {
        const isSelected = selectedToppings.some(t => t.id === top.id);
        const box = document.createElement('div');
        box.className = `option-box ${isSelected ? 'selected' : ''}`;
        box.innerHTML = `
            <span>${top.icon} ${top.name}</span>
            <small>+${formatRupiah(top.price)}</small>
        `;
        box.onclick = () => {
            if (isSelected) {
                selectedToppings = selectedToppings.filter(t => t.id !== top.id);
            } else {
                selectedToppings.push(top);
            }
            renderToppingOptions();
            calculateModalPrice();
        };
        grid.appendChild(box);
    });
}

function calculateModalPrice() {
    if (!activeCustomizingProduct) return;
    let price = activeCustomizingProduct.price + selectedSize.priceExtra;
    selectedToppings.forEach(t => price += t.price);
    document.getElementById('modalCalculatedPrice').innerText = formatRupiah(price);
}

function confirmAddToCart() {
    let itemPrice = activeCustomizingProduct.price + selectedSize.priceExtra;
    selectedToppings.forEach(t => itemPrice += t.price);

    const cartItem = {
        cartId: Date.now(),
        productId: activeCustomizingProduct.id,
        name: activeCustomizingProduct.name,
        size: selectedSize.name,
        toppings: selectedToppings.map(t => t.name),
        unitPrice: itemPrice,
        qty: 1
    };

    cart.push(cartItem);
    closeCustomModal();
    updateCartUI();
    document.getElementById('cartDrawer').classList.add('open');
}

// CART MANAGEMENT
function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
}

function updateCartQty(cartId, delta) {
    const item = cart.find(i => i.cartId === cartId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.cartId !== cartId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartBadge').innerText = totalCount;
    document.getElementById('cartCount').innerText = totalCount;

    const container = document.getElementById('cartItemsContainer');
    container.innerHTML = '';

    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999; margin-top:30px;">Keranjang Anda masih kosong.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.unitPrice * item.qty;
            subtotal += itemTotal;

            const toppingsText = item.toppings.length > 0 ? `<br><small style="color:#666;">Top: ${item.toppings.join(', ')}</small>` : '';

            const div = document.createElement('div');
            div.style.background = '#FFF9FA';
            div.style.padding = '10px';
            div.style.borderRadius = '12px';
            div.style.marginBottom = '12px';
            div.style.border = '1px solid #FFE5EC';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div>
                        <strong>${item.name}</strong> <small>(${item.size})</small>
                        ${toppingsText}
                        <br><small style="color:var(--primary-color); font-weight:bold;">${formatRupiah(item.unitPrice)} / item</small>
                    </div>
                    <div>
                        <button class="btn-secondary" style="padding: 2px 8px;" onclick="updateCartQty(${item.cartId}, -1)">-</button>
                        <span style="margin: 0 5px;">${item.qty}</span>
                        <button class="btn-secondary" style="padding: 2px 8px;" onclick="updateCartQty(${item.cartId}, 1)">+</button>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    document.getElementById('cartSubtotal').innerText = formatRupiah(subtotal);
}

// CHECKOUT & PAYMENT FLOW
function openCheckout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong!');
        return;
    }
    const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    document.getElementById('summaryTotalItems').innerText = totalItems;
    document.getElementById('summaryTotalPrice').innerText = formatRupiah(subtotal);

    toggleCart();
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

function processPayment(e) {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const method = document.getElementById('payMethod').value;
    const total = document.getElementById('summaryTotalPrice').innerText;

    closeCheckout();

    document.getElementById('recTxId').innerText = '#CF-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('recName').innerText = name;
    document.getElementById('recMethod').innerText = method;
    document.getElementById('recTotal').innerText = total;

    document.getElementById('receiptModal').classList.remove('hidden');
}

function finishOrder() {
    cart = [];
    updateCartUI();
    document.getElementById('receiptModal').classList.add('hidden');
}

function scrollToMenu() {
    document.getElementById('flavors').scrollIntoView({ behavior: 'smooth' });
}

// 4. CHAT ADMIN WIDGET (SMART RESPONSIVE BOT)
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('hidden');
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    const chatBody = document.getElementById('chatBody');

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<p>${text}</p><span class="chat-time">Baru saja</span>`;
    chatBody.appendChild(userMsg);

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // SISTEM RESPON CERDAS DENGAN KATA KUNCI
    setTimeout(() => {
        const lowerText = text.toLowerCase();
        let reply = "Terima kasih atas pesannya! 😊 Ada yang bisa kami bantu lagi mengenai varian rasa atau pesanan kamu?";

        if (lowerText.includes("halo") || lowerText.includes("hai") || lowerText.includes("pagi") || lowerText.includes("siang") || lowerText.includes("malam")) {
            reply = "Halo! 👋 Selamat datang di Cone-Fidence. Hari ini kamu mau coba varian rasa apa nih?";
        } else if (lowerText.includes("rasa") || lowerText.includes("menu") || lowerText.includes("varian")) {
            reply = "Varian rasa terpopuler kami saat ini adalah 🍓 **Strawberry Bliss** dan 🍫 **Chocolate Fudge**! Jangan lupa tambah topping favoritmu ya!";
        } else if (lowerText.includes("harga") || lowerText.includes("promo") || lowerText.includes("diskon")) {
            reply = "Saat ini kami ada promo **Beli 2 Scoop Gratis 1 Scoop**! Harga varian rasa mulai dari Rp 22.000 saja.";
        } else if (lowerText.includes("lokasi") || lowerText.includes("alamat") || lowerText.includes("toko") || lowerText.includes("jam")) {
            reply = "Outlet pusat kami berlokasi di **Jl. Manis No. 123, Kota Dessert**. Kami buka setiap hari jam **11.00 - 22.00 WIB**.";
        } else if (lowerText.includes("ongkir") || lowerText.includes("kirim") || lowerText.includes("pesan")) {
            reply = "Setiap pembelian di atas **Rp 30.000** berhak mendapatkan **Gratis Ongkir**! Kamu bisa klik tombol PESAN ONLINE di atas.";
        }

        const adminMsg = document.createElement('div');
        adminMsg.className = 'chat-message admin';
        adminMsg.innerHTML = `<p>${reply}</p><span class="chat-time">Baru saja</span>`;
        chatBody.appendChild(adminMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}