document.addEventListener('DOMContentLoaded', () => {
    // Cart count element and variable
    const cartCountEl = document.querySelector('.cart-count');
    let cartCount = parseInt(cartCountEl.textContent) || 0;

    // Function to update cart count display
    function updateCartCount(amount) {
        cartCount += amount;
        cartCountEl.textContent = cartCount;
    }

    // Add to Cart - main product
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        let qty = parseInt(quantityInput.value, 10);
        if (isNaN(qty) || qty < 1) qty = 1;
        if (qty > 99) qty = 99;
        updateCartCount(qty);
    });

    // Quantity controls (+/- buttons)
    const decreaseBtn = document.querySelector('.qty-btn.decrease');
    const increaseBtn = document.querySelector('.qty-btn.increase');
    decreaseBtn.addEventListener('click', () => {
        let current = parseInt(quantityInput.value, 10) || 1;
        if (current > 1) {
            quantityInput.value = current - 1;
        }
    });
    increaseBtn.addEventListener('click', () => {
        let current = parseInt(quantityInput.value, 10) || 1;
        if (current < 99) {
            quantityInput.value = current + 1;
        }
    });
    // Clamp manual input to range
    quantityInput.addEventListener('input', () => {
        let val = parseInt(quantityInput.value, 10);
        if (isNaN(val) || val < 1) {
            quantityInput.value = 1;
        } else if (val > 99) {
            quantityInput.value = 99;
        }
    });

    // Thumbnail image switching
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Only switch if thumbnail is visible
            if (thumbnail.classList.contains('hidden')) return;
            // Remove active from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Set clicked thumbnail as active
            thumbnail.classList.add('active');
            // Update main image source
            const newSrc = thumbnail.getAttribute('data-image');
            if (newSrc) {
                mainImage.src = newSrc;
            }
        });
    });

    // Color variant switching
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const selectedColorLabel = document.getElementById('selected-color');
    const colorNames = {
        navy: 'Navy Blue',
        black: 'Black',
        grey: 'Grey',
        green: 'Green'
    };
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            if (!color) return;
            // Update active swatch
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            // Update displayed color name
            if (colorNames[color]) {
                selectedColorLabel.textContent = colorNames[color];
            }
            // Show/hide thumbnails for selected color
            thumbnails.forEach(th => {
                if (th.getAttribute('data-color') === color) {
                    th.classList.remove('hidden');
                } else {
                    th.classList.add('hidden');
                }
                // Remove any 'active' on hidden thumbnails
                if (th.classList.contains('hidden')) {
                    th.classList.remove('active');
                }
            });
            // Activate the first thumbnail of this color
            const firstVisible = document.querySelector(`.thumbnail:not(.hidden)[data-color="${color}"]`);
            if (firstVisible) {
                firstVisible.classList.add('active');
                const firstImageSrc = firstVisible.getAttribute('data-image');
                if (firstImageSrc) {
                    mainImage.src = firstImageSrc;
                }
            }
        });
    });

    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    const selectedSizeLabel = document.getElementById('selected-size');
    const sizeNames = {
        XS: 'Extra Small',
        S: 'Small',
        M: 'Medium',
        L: 'Large',
        XL: 'X-Large',
        XXL: 'XX-Large'
    };
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active size button
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Update displayed selected size
            const sizeKey = button.getAttribute('data-size');
            if (sizeNames[sizeKey]) {
                selectedSizeLabel.textContent = sizeNames[sizeKey];
            }
        });
    });

    // Tabs (Description, Product Info, Shipping)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabButtons.forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');
            // Show corresponding tab panel
            const target = tabBtn.getAttribute('data-tab');
            tabPanels.forEach(panel => {
                if (panel.id === target) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // Modal handling (Size Chart & Compare Colors)
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const compareColorsBtn = document.getElementById('compare-colors');
    const sizeModal = document.getElementById('size-chart-modal');
    const compareModal = document.getElementById('compare-colors-modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    // Open size chart modal
    sizeChartBtn.addEventListener('click', () => {
        sizeModal.classList.add('active');
        modalOverlay.classList.add('active');
    });
    // Open compare colors modal
    compareColorsBtn.addEventListener('click', () => {
        compareModal.classList.add('active');
        modalOverlay.classList.add('active');
    });
    // Close modals on close button
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
            modalOverlay.classList.remove('active');
        });
    });
    // Close modals when clicking overlay
    modalOverlay.addEventListener('click', () => {
        [sizeModal, compareModal].forEach(modal => {
            modal.classList.remove('active');
        });
        modalOverlay.classList.remove('active');
    });

    // Wishlist toggle (heart icon)
    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        if (wishlistBtn.classList.contains('active')) {
            wishlistBtn.textContent = '♥';
        } else {
            wishlistBtn.textContent = '♡';
        }
    });

    // Thumbnail scrolling (vertical)
    const thumbScrollContainer = document.querySelector('.thumbnails-scroll');
    const thumbPrevBtn = document.querySelector('.thumbnail-scroll-btn.prev');
    const thumbNextBtn = document.querySelector('.thumbnail-scroll-btn.next');
    thumbPrevBtn.addEventListener('click', () => {
        thumbScrollContainer.scrollBy({ top: -100, behavior: 'smooth' });
    });
    thumbNextBtn.addEventListener('click', () => {
        thumbScrollContainer.scrollBy({ top: 100, behavior: 'smooth' });
    });

    // Complementary products scrolling (horizontal)
    const compScrollContainer = document.querySelector('.comp-products-scroll');
    const compPrevBtn = document.querySelector('.comp-scroll-btn.prev');
    const compNextBtn = document.querySelector('.comp-scroll-btn.next');
    compPrevBtn.addEventListener('click', () => {
        const scrollAmount = compScrollContainer.clientWidth;
        compScrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    compNextBtn.addEventListener('click', () => {
        const scrollAmount = compScrollContainer.clientWidth;
        compScrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // "Pairs Well With" products add to cart (each adds 1)
    const compAddBtns = document.querySelectorAll('.comp-product-add');
    compAddBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateCartCount(1);
        });
    });

    // Add bundle to cart (adds number of bundle items)
    const bundleAddBtn = document.querySelector('.bundle-add-btn');
    bundleAddBtn.addEventListener('click', () => {
        const bundleItems = document.querySelectorAll('.bundle-product').length;
        updateCartCount(bundleItems);
    });
});