// main.js - Product Page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initProductImages();
    initProductVariants();
    initSizeChart();
    initCompareColors();
    initTabs();
    initCarousels();
    initBundle();
    initZoomEffect();
    loadSavedVariants();
});

// 1. Product Images Gallery
function initProductImages() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            const newSrc = this.getAttribute('data-full-img');
            mainImage.src = newSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize thumbnail scroller if needed
    initThumbnailScroller();
}

function initThumbnailScroller() {
    const thumbnailContainer = document.querySelector('.thumbnails-container');
    if (!thumbnailContainer) return;
    
    const scrollUp = document.querySelector('.scroll-up');
    const scrollDown = document.querySelector('.scroll-down');
    
    if (scrollUp && scrollDown) {
        scrollUp.addEventListener('click', function() {
            thumbnailContainer.scrollBy({
                top: -100,
                behavior: 'smooth'
            });
        });
        
        scrollDown.addEventListener('click', function() {
            thumbnailContainer.scrollBy({
                top: 100,
                behavior: 'smooth'
            });
        });
    }
}

// 2. Size Chart Modal
function initSizeChart() {
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const modalClose = document.querySelector('#size-chart-modal .close-modal');
    const modalOverlay = document.querySelector('#size-chart-modal .modal-overlay');
    
    if (!sizeChartBtn || !sizeChartModal) return;
    
    sizeChartBtn.addEventListener('click', function() {
        sizeChartModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    // Close modal by clicking X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal by clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sizeChartModal.classList.contains('open')) {
            closeModal();
        }
    });
    
    function closeModal() {
        sizeChartModal.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// 3. Product Variants
function initProductVariants() {
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    const variantImage = document.getElementById('main-product-image');
    const colorLabel = document.getElementById('selected-color');
    const sizeLabel = document.getElementById('selected-size');
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update color label
            if (colorLabel) {
                colorLabel.textContent = this.getAttribute('data-color');
            }
            
            // Update product image if there's a variant image
            const variantImgSrc = this.getAttribute('data-img');
            if (variantImgSrc && variantImage) {
                variantImage.src = variantImgSrc;
            }
            
            // Save selection to localStorage
            saveVariantSelection('color', this.getAttribute('data-color'));
        });
    });
    
    // Size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update size label
            if (sizeLabel) {
                sizeLabel.textContent = this.getAttribute('data-size');
            }
            
            // Save selection to localStorage
            saveVariantSelection('size', this.getAttribute('data-size'));
        });
    });
}

// Save variant selections to localStorage
function saveVariantSelection(type, value) {
    const productId = document.querySelector('.product-container').getAttribute('data-product-id');
    let savedSelections = JSON.parse(localStorage.getItem('variantSelections')) || {};
    
    if (!savedSelections[productId]) {
        savedSelections[productId] = {};
    }
    
    savedSelections[productId][type] = value;
    localStorage.setItem('variantSelections', JSON.stringify(savedSelections));
}

// Load saved variant selections from localStorage
function loadSavedVariants() {
    const productId = document.querySelector('.product-container').getAttribute('data-product-id');
    const savedSelections = JSON.parse(localStorage.getItem('variantSelections')) || {};
    
    if (savedSelections[productId]) {
        // Restore color selection
        if (savedSelections[productId].color) {
            const colorToSelect = document.querySelector(`.color-option[data-color="${savedSelections[productId].color}"]`);
            if (colorToSelect) {
                colorToSelect.click();
            }
        }
        
        // Restore size selection
        if (savedSelections[productId].size) {
            const sizeToSelect = document.querySelector(`.size-option[data-size="${savedSelections[productId].size}"]`);
            if (sizeToSelect) {
                sizeToSelect.click();
            }
        }
    }
}

// 4. Compare Colors
function initCompareColors() {
    const compareBtn = document.getElementById('compare-colors-btn');
    const compareModal = document.getElementById('compare-colors-modal');
    const modalClose = document.querySelector('#compare-colors-modal .close-modal');
    const colorSwatches = document.querySelectorAll('.compare-color-swatch');
    
    if (!compareBtn || !compareModal) return;
    
    compareBtn.addEventListener('click', function() {
        compareModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeCompareModal);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && compareModal.classList.contains('open')) {
            closeCompareModal();
        }
    });
    
    document.querySelector('#compare-colors-modal .modal-overlay').addEventListener('click', closeCompareModal);
    
    // Allow selecting colors to compare
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateCompareCounter();
        });
    });
    
    function closeCompareModal() {
        compareModal.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    function updateCompareCounter() {
        const selectedCount = document.querySelectorAll('.compare-color-swatch.selected').length;
        const counter = document.getElementById('selected-colors-count');
        if (counter) {
            counter.textContent = selectedCount;
        }
    }
}

// 5 & 8. Carousels (For "Pair Well With" and "Related Products")
function initCarousels() {
    // Pair Well With carousel
    initCarousel('pair-well-carousel');
    
    // If related products are in a carousel format
    initCarousel('related-products-carousel');
}

function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const itemsContainer = carousel.querySelector('.carousel-items');
    
    if (prevBtn && nextBtn && itemsContainer) {
        const scrollAmount = itemsContainer.querySelector('.carousel-item').offsetWidth;
        
        prevBtn.addEventListener('click', function() {
            itemsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            itemsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
}

// 6. Product Bundle
function initBundle() {
    const bundleCheckboxes = document.querySelectorAll('.bundle-item-checkbox');
    const addBundleBtn = document.getElementById('add-bundle-btn');
    const bundleTotalEl = document.getElementById('bundle-total');
    
    if (!bundleCheckboxes.length || !bundleTotalEl) return;
    
    // Calculate initial bundle total
    calculateBundleTotal();
    
    // Update total when checkboxes change
    bundleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateBundleTotal);
    });
    
    // Add bundle to cart
    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', function() {
            const selectedItems = [];
            bundleCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedItems.push(checkbox.getAttribute('data-product-id'));
                }
            });
            
            if (selectedItems.length > 0) {
                console.log('Adding bundle to cart:', selectedItems);
                // In a real implementation, this would call a cart API
                
                // Show confirmation
                const notification = document.createElement('div');
                notification.classList.add('notification');
                notification.textContent = 'Bundle added to cart!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        });
    }
    
    function calculateBundleTotal() {
        let total = 0;
        bundleCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.getAttribute('data-price') || 0);
                total += price;
            }
        });
        
        bundleTotalEl.textContent = '$' + total.toFixed(2);
    }
}

// 7. Tabs for Product Info
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabButtons.length || !tabContents.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Bonus feature: Image zoom on hover
function initZoomEffect() {
    const mainImage = document.getElementById('main-product-image');
    const zoomContainer = document.querySelector('.product-image-container');
    
    if (!mainImage || !zoomContainer) return;
    
    zoomContainer.addEventListener('mouseenter', function() {
        mainImage.classList.add('zoom-effect');
    });
    
    zoomContainer.addEventListener('mouseleave', function() {
        mainImage.classList.remove('zoom-effect');
    });
    
    zoomContainer.addEventListener('mousemove', function(e) {
        if (!mainImage.classList.contains('zoom-effect')) return;
        
        const rect = zoomContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        
        mainImage.style.transformOrigin = `${x}% ${y}%`;
    });
}

// Add to Cart functionality
document.querySelector('.add-to-cart-btn')?.addEventListener('click', function() {
    const productId = document.querySelector('.product-container').getAttribute('data-product-id');
    const selectedColor = document.querySelector('.color-option.active')?.getAttribute('data-color');
    const selectedSize = document.querySelector('.size-option.active')?.getAttribute('data-size');
    const quantity = document.querySelector('#quantity-input')?.value || 1;
    
    if (!selectedColor || !selectedSize) {
        alert('Please select color and size options');
        return;
    }
    
    // In a real implementation, this would call a cart API
    console.log('Adding to cart:', {
        productId,
        color: selectedColor,
        size: selectedSize,
        quantity
    });
    
    // Show confirmation
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = 'Product added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
});